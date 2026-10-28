# Kaifeng Yan — Engineering & Notes

Personal portfolio and bilingual technical notes, built with Astro and published at **https://icn1vad.github.io/**.

The site presents full-stack and AI agent projects, education and internships, an English public CV, and notes from my own cloud-computing coursework. The site combines English technical titles with Chinese context, contribution notes, and results. A compact profile sidebar, project cards, technical notes, and education/experience panels provide clear hierarchy without slogans or decorative badges. Chinese and English public CVs are available separately.

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
- The English public CV is in `public/assets/kaifeng-yan-cv.pdf`; the matching Chinese version is `public/assets/kaifeng-yan-cv-zh.pdf`. Both use the selected public email address.
- Course notes distinguish the original lab year from publication. A historical record is not a claim that the environment was rerun against current releases.

## Deployment

GitHub Actions checks pull requests. Pushes to `main` build and deploy `dist/` to GitHub Pages. No secrets are required for the static site. Search runs locally in the visitor’s browser. There are no analytics, external fonts, or third-party scripts.

## History and credits

The earlier site used Sen Li’s academic-homepage template. The original MIT license is preserved in `LICENSE`. The legacy `contents/`, `static/`, and root `index.html` remain in the repository history and working tree for reference; the current deployment serves only the Astro build output.

The current design was developed from a reviewed local HTML prototype. Article structure takes inspiration from technical blogs; the content uses my own course records and project documentation. Research adaptations retain their upstream attributions.

## Design references

The information hierarchy was reviewed against [Zhongquan Zhou’s blog](https://zhouzhq2021.github.io/), [Chao Huang’s homepage](https://sites.google.com/view/chaoh), [Academic Pages](https://github.com/academicpages/academicpages.github.io), [al-folio](https://github.com/alshedivat/al-folio), and [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy). These are layout and organization references; the site retains its own Astro implementation and personal content.
