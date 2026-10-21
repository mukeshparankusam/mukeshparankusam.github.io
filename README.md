# Mukesh Parankusam — Portfolio

A responsive personal portfolio for Mukesh Parankusam, featuring academic experience, curriculum design, educational initiatives, publications, the THAT’S IT poetry reader, and the EMKAY AI interface.

## Portfolio highlights
- 8+ years of experience
- Curriculum support for 10+ schools
- 6,000+ students taught
- PRIME EXPLORIUM, Prime Institute of Excellence, and Newway Preschools
- Books and learning resources, including TIP, THAT’S IT, and EMKAY LEARNING SERIES

## Deploy on GitHub Pages
1. Upload the contents of this folder to the root of the `mukeshparankusam.github.io` repository.
2. Keep the `CNAME` file at the repository root for the custom domain.
3. In repository Settings → Pages, select the intended deployment branch and root folder.
4. Wait for GitHub Pages to finish deploying, then hard-refresh the website.

## EMKAY AI setup
The chat interface is included, but live AI replies require a deployed Cloudflare Worker and a configured endpoint in `assets/js/config.js`. Never put a private AI API key in frontend JavaScript. Follow `backend-cloudflare/worker.js` and configure secrets in the Cloudflare dashboard.

## Structure
- `index.html` — main portfolio
- `assets/css/style.css` — main responsive styles
- `assets/css/poems.css` — poetry reader styles
- `assets/js/main.js` — navigation, preloader, and EMKAY AI UI
- `assets/js/poems.js`, `assets/js/poems-data.js` — poetry reader and collection data
- `backend-cloudflare/worker.js` — optional secure chat backend
