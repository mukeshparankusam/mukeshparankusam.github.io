# Mukesh Parankusam — GitHub Pages Website

This package is the approved black, warm-white and gold portfolio design. It includes the responsive homepage, organization cards, publications, complete 50-poem reader, and the EMKAY AI chat interface.

## Upload to GitHub Pages
1. Extract this ZIP. The `index.html`, `poems.html`, `CNAME`, `assets/` and `backend-cloudflare/` items are at the root of the extracted folder.
2. Back up the existing GitHub repository first.
3. Upload the **contents** of the extracted folder to the root of `mukeshparankusam.github.io`; do not upload the enclosing folder itself. `index.html` must be at the repository root.
4. Commit the changes. In Settings → Pages, make sure the repository is deployed from the intended branch/root.
5. Keep the `CNAME` file and check HTTPS after deployment.

## THAT’S IT — 50 poems
The reader uses all 50 poems found in the prior portfolio archive. The titles and poem text are included in `assets/js/poems-data.js`.

## Links
- Newway Preschools: `http://mukeshparankusam.co.in/newway-school-website/`
- EMKAY Learning Series: `http://mukeshparankusam.co.in/emkay-learning-series/`
- PRIME EXPLORIUM: `https://primeexplorium.org`

## EMKAY AI — enable live responses
GitHub Pages is static hosting; it cannot safely hold a private AI API key or run the backend. The chat interface is included, and a Cloudflare Worker backend starter is in `backend-cloudflare/worker.js`. To enable actual responses:
1. Create a Cloudflare Worker and deploy `backend-cloudflare/worker.js`.
2. Add an encrypted Worker secret named `OPENAI_API_KEY` using the provider API key. Do not place this key in this repository.
3. Set Worker variable `ALLOWED_ORIGIN` to `https://mukeshparankusam.co.in` (you may include a comma-separated GitHub Pages origin if needed). Optionally set `OPENAI_MODEL`.
4. Copy the deployed Worker endpoint URL ending in `/api/chat` into `window.EMKAY_AI_ENDPOINT` in `assets/js/config.js`.
5. Redeploy the GitHub Pages files and test a new conversation and follow-up questions. API usage may incur provider charges.

Until those backend steps are completed, the EMKAY AI window is present but live AI answers will not work.
