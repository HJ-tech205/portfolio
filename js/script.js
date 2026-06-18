document.addEventListener("DOMContentLoaded", () => {
    const menuTabs = document.querySelectorAll(".menu-tab");
    const portfolioScreens = document.querySelectorAll(".portfolio-screen");

    menuTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Drop styling flags from previous selection
            menuTabs.forEach(t => t.classList.remove("active"));
            
            // Set current clicked item live
            tab.classList.add("active");

            const activeTargetId = tab.getAttribute("data-target");

            portfolioScreens.forEach(screen => {
                if (screen.id === activeTargetId) {
                    screen.classList.add("visible");
                } else {
                    screen.classList.remove("visible");
                }
            });

            // Smooth track reposition back to top of workspace
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});