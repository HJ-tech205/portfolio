# Nwahadji Nduvho Mafadza | Portfolio

Live site: https://hj-tech205.github.io/portfolio/

A static portfolio (HTML, CSS and a little JavaScript) hosted on GitHub Pages.

## Where to edit things

| What | Where |
| --- | --- |
| Certificates on the wheel | `js/data.js`, the `CERTIFICATES` list |
| Project case studies (the pop-up windows) | `js/data.js`, the `PROJECTS` object |
| Hero text, experience, education, contact | `index.html` |
| Colours and fonts | top of `css/style.css` (`:root`) |
| Your photo | `images/profile.jpeg` |

## Adding a certificate

1. Save the image in `images/certificates/` (for example `images/certificates/istqb.png`).
2. In `js/data.js`, add or edit an entry and set `image: "images/certificates/istqb.png"`.
3. Delete the `placeholder: true` entries once you have real ones. The wheel adjusts to any number of certificates.

## Adding project links

In `js/data.js`, give a project a `links` list, for example:

```js
links: [{ label: "View on GitHub", href: "https://github.com/..." }]
```

## Download CV button

Put your CV at `files/Mafadza_CV_.docx`. The button only appears when that file exists.
