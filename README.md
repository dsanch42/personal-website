# Personal Website

A professional personal website with a static, non-editable profile implementation for direct browser use and GitHub Pages hosting.

## Features

- Corporate, minimalist dark design
- Fixed About, Accomplishments, Resume, and Contact sections
- Permanent headshot display
- Permanent resume download link
- Responsive layout for desktop and mobile
- No editable inputs or in-browser content mutation

## Project Structure

- `index.html`: Static website markup and permanent profile content
- `site.css`: Styling and responsive layout
- `assets/`: Resume and headshot files used by the site
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow

## Local Development

Open `index.html` directly in a browser, or serve the folder from any static web server.

## Build for Production

No build step is required for the static implementation.

## Deploy To GitHub Pages

1. Push this project to a GitHub repository.
2. In repository settings, open Pages and set Source to GitHub Actions.
3. Keep your default branch as `main` (or update `.github/workflows/deploy-pages.yml` if different).
4. Push changes to `main` to trigger deployment.
5. After the workflow completes, your site will be available at:
   - `https://<username>.github.io/<repository>/` for project sites
   - `https://<username>.github.io/` for user/organization sites (`<username>.github.io` repo name)

The workflow automatically sets the correct Vite base path for both URL styles.

## Notes

- This site is intentionally locked to permanent profile content.
- Current fixed contact details: `dsanchez1396@gmail.com`, `https://www.linkedin.com/in/dsanch42`, `Chicago, IL`.
- Included assets: `assets/David Sanchez_Resume_UPDATE.docx` and `assets/CCW_David_Sanchez.jpg`.
