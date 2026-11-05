document.addEventListener("DOMContentLoaded", () => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    /* ---------------------------------------------------------
       Navigation: mobile menu + active section
       --------------------------------------------------------- */
    const rail = $("#rail");
    const toggle = $("#railToggle");

    function setMenu(open) {
        rail.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", () => setMenu(!rail.classList.contains("open")));
    $$(".rail-nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && rail.classList.contains("open")) setMenu(false);
    });

    const navLinks = $$(".rail-nav a");
    const sections = navLinks
        .map(a => document.getElementById(a.getAttribute("href").slice(1)))
        .filter(Boolean);

    if ("IntersectionObserver" in window) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.forEach(a =>
                    a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
                );
            });
        }, { rootMargin: "-35% 0px -60% 0px" });
        sections.forEach(s => spy.observe(s));
    }

    /* ---------------------------------------------------------
       CV button: only shown when the file exists
       --------------------------------------------------------- */
    const cvButton = $("#cvButton");
    if (cvButton) {
        fetch(cvButton.getAttribute("href"), { method: "HEAD" })
            .then(res => { if (res.ok) cvButton.hidden = false; })
            .catch(() => {});
    }

    /* ---------------------------------------------------------
       Dialog helpers
       --------------------------------------------------------- */
    function wireDialog(dialog) {
        dialog.addEventListener("click", e => {
            if (e.target === dialog) dialog.close();
        });
    }

    /* ---------------------------------------------------------
       Project case studies
       --------------------------------------------------------- */
    const caseDialog = $("#caseDialog");
    const caseInner = $("#caseInner");
    wireDialog(caseDialog);

    function section(title, child) {
        const wrap = el("div");
        wrap.appendChild(el("h3", "", title));
        wrap.appendChild(child);
        return wrap;
    }

    function openProject(key) {
        const p = (window.PROJECTS || {})[key];
        if (!p) return;
        caseInner.textContent = "";

        const title = el("h2", "", p.title);
        title.id = "caseTitle";
        caseInner.append(title, el("p", "case-sub", p.subtitle), el("p", "case-meta", p.meta));

        caseInner.appendChild(section("The problem", el("p", "", p.problem)));

        const list = el("ul");
        p.built.forEach(item => list.appendChild(el("li", "", item)));
        caseInner.appendChild(section("What I built", list));

        const tags = el("div", "tags");
        p.stack.forEach(t => tags.appendChild(el("span", "", t)));
        caseInner.appendChild(section("Tools", tags));

        if (p.practice) caseInner.appendChild(section("How we worked", el("p", "", p.practice)));

        if (p.links && p.links.length) {
            const links = el("div", "case-links");
            p.links.forEach(l => {
                const a = el("a", "btn btn-line", l.label);
                a.href = l.href;
                a.target = "_blank";
                a.rel = "noopener";
                links.appendChild(a);
            });
            caseInner.appendChild(links);
        }

        caseDialog.showModal();
        caseDialog.scrollTop = 0;
    }

    $$("[data-project]").forEach(btn =>
        btn.addEventListener("click", () => openProject(btn.dataset.project))
    );

    /* ---------------------------------------------------------
       Certificates wheel
       --------------------------------------------------------- */
    const certs = window.CERTIFICATES || [];
    const wheel = $("#wheel");
    const ring = $("#wheelRing");
    const stage = $("#wheelStage");
    const titleEl = $("#wheelTitle");
    const metaEl = $("#wheelMeta");
    const openBtn = $("#wheelOpen");
    const viewer = $("#viewerDialog");
    const viewerInner = $("#viewerInner");
    wireDialog(viewer);

    if (!certs.length) {
        $("#certificates").hidden = true;
        return;
    }

    const n = certs.length;
    const step = 360 / n;
    let idx = 0;
    let radius = 0;
    let cards = [];
    let suppressClick = false;

    const norm = deg => ((deg + 540) % 360) - 180;
    const current = () => ((idx % n) + n) % n;

    function makeFace(c, tag) {
        const face = el(tag || "button", "cert-face");
        if (tag !== "div") face.type = "button";

        if (c.placeholder) {
            face.classList.add("is-empty");
            const icon = el("i", "bx bx-award");
            icon.setAttribute("aria-hidden", "true");
            face.append(icon, el("span", "cert-label", c.title));
            return face;
        }

        face.setAttribute("aria-label", [c.title, c.issuer, c.status].filter(Boolean).join(", "));
        if (c.image) {
            const img = el("img");
            img.src = c.image;
            img.alt = c.title;
            img.draggable = false;
            face.appendChild(img);
        } else {
            face.append(
                el("span", "cert-label", c.status || "Certificate"),
                el("span", "cert-name", c.title),
                el("span", "cert-issuer", c.issuer)
            );
        }
        return face;
    }

    function build() {
        ring.textContent = "";
        cards = certs.map((c, i) => {
            const card = el("div", "cert-card");
            card.dataset.i = i;
            card.appendChild(makeFace(c));
            ring.appendChild(card);
            return card;
        });
        layout();
    }

    function layout() {
        const w = ring.offsetWidth;
        // wide enough that the neighbouring certificates stay visible beside the front one
        radius = Math.max(w / 2 / Math.tan(Math.PI / n) + 26, w * 1.25);
        cards.forEach((card, i) => {
            card.style.transform = "rotateY(" + i * step + "deg) translateZ(" + radius + "px)";
        });
        render();
    }

    function render(angle) {
        const a = angle === undefined ? idx * step : angle;
        ring.style.transform = "translateZ(" + -radius + "px) rotateY(" + -a + "deg)";

        cards.forEach((card, i) => {
            const d = Math.abs(norm(i * step - a));
            const front = d < step / 2;
            const near = d <= step * 1.01;
            card.style.opacity = front ? 1 : near ? 0.55 : 0.1;
            card.style.filter = front ? "none" : "brightness(0.7)";
            card.style.pointerEvents = near ? "auto" : "none";
            card.setAttribute("aria-hidden", front ? "false" : "true");
            const face = card.firstElementChild;
            if (face) face.tabIndex = front ? 0 : -1;
        });

        if (angle === undefined) updateCaption();
    }

    function updateCaption() {
        const c = certs[current()];
        titleEl.textContent = c.placeholder ? c.title : c.title;
        metaEl.textContent = [c.issuer, c.status].filter(Boolean).join(". ");
        openBtn.hidden = !!c.placeholder;
    }

    function go(delta) {
        idx += delta;
        render();
    }

    function goTo(i) {
        let d = i - current();
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        go(d);
    }

    function openViewer() {
        const c = certs[current()];
        if (c.placeholder) return;
        viewerInner.textContent = "";
        if (c.image) {
            const img = el("img");
            img.src = c.image;
            img.alt = c.title;
            viewerInner.appendChild(img);
        } else {
            viewerInner.appendChild(makeFace(c, "div"));
        }
        viewerInner.append(
            el("p", "viewer-title", c.title),
            el("p", "viewer-meta", [c.issuer, c.status].filter(Boolean).join(". "))
        );
        viewer.showModal();
    }

    $("#wheelPrev").addEventListener("click", () => go(-1));
    $("#wheelNext").addEventListener("click", () => go(1));
    openBtn.addEventListener("click", openViewer);

    ring.addEventListener("click", e => {
        if (suppressClick) return;
        const card = e.target.closest(".cert-card");
        if (!card) return;
        const i = Number(card.dataset.i);
        if (i === current()) openViewer();
        else goTo(i);
    });

    wheel.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });

    /* drag to spin */
    let startX = null;
    let baseAngle = 0;
    let angleNow = 0;
    let dragging = false;

    stage.addEventListener("pointerdown", e => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        startX = e.clientX;
        baseAngle = idx * step;
        angleNow = baseAngle;
        dragging = false;
    });

    stage.addEventListener("pointermove", e => {
        if (startX === null) return;
        const dx = e.clientX - startX;
        if (!dragging && Math.abs(dx) > 8) {
            dragging = true;
            wheel.classList.add("dragging");
            stage.setPointerCapture(e.pointerId);
        }
        if (dragging) {
            angleNow = baseAngle - dx * (step / (ring.offsetWidth * 0.8));
            render(angleNow);
        }
    });

    function endDrag() {
        if (startX === null) return;
        if (dragging) {
            idx = Math.round(angleNow / step);
            wheel.classList.remove("dragging");
            suppressClick = true;
            setTimeout(() => { suppressClick = false; }, 0);
            render();
        }
        startX = null;
        dragging = false;
    }
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layout, 120);
    });

    build();
    updateCaption();
});
