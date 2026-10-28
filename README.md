# Kaifeng Yan — Engineering & Notes

Personal portfolio and bilingual technical notes, built with Astro and published at **https://icn1vad.github.io/**.

The site presents full-stack and AI agent projects, education and internships, an English public CV, and notes from my own cloud-computing coursework. Chinese is the primary reading language, with English technical terms and a downloadable English CV. The layout uses a single column, plain text navigation, and compact project and note lists.

## Local development

Use Node.js 24 and pnpm 11.

```sh
pnpm install
pnpm dev
pnpm build
pnpm check:content
pnpm preview
```

## Update content

- Add or edit articles in `src/content/writing/` and project case studies in `src/content/projects/`.
- Each Markdown file carries its title, bilingual subtitle, tags, provenance, and other page metadata in frontmatter.
- Shared layout and styles are in `src/layouts/` and `src/styles/`; browser interactions are in `src/scripts/site.js`.
- The downloadable public CV is in `public/assets/kaifeng-yan-cv.pdf`. It omits private contact details.
- Course notes distinguish the original lab year from publication. A historical record is not a claim that the environment was rerun against current releases.

## Deployment

GitHub Actions checks pull requests. Pushes to `main` build and deploy `dist/` to GitHub Pages. No secrets are required for the static site. Search runs locally in the visitor’s browser. There are no analytics, external fonts, or third-party scripts.

## History and credits

The earlier site used Sen Li’s academic-homepage template. The original MIT license is preserved in `LICENSE`. The legacy `contents/`, `static/`, and root `index.html` remain in the repository history and working tree for reference; the current deployment serves only the Astro build output.

The current design was developed from a reviewed local HTML prototype. Article structure takes inspiration from technical blogs; the content uses my own course records and project documentation. Research adaptations retain their upstream attributions.
