# mainulhossain123.github.io

<div align="center">

[![Preview](readme_preview/al-folio-preview.png)](https://mainulhossain123.github.io/)

**Personal portfolio site for Mainul Hossain  Site Reliability Engineer @ Optimizely.**

[** Live site**](https://mainulhossain123.github.io/)

</div>

---

## About

This is my personal portfolio, built as a clean one-page experience on top of the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme. It covers who I am, where I've worked, and what I've built  without the noise.

The site is continuously iterated on. This is **V3**, which introduced the one-page layout, experience tab section, and Gazi-style project cards.

---

## Features

### Light / Dark Mode

The site detects the user's preferred color scheme automatically. You can also toggle manually via the sun/moon icon in the top-right navbar.

<p align="center">
<img src="readme_preview/light.png" width=400>
<img src="readme_preview/dark.png" width=400>
</p>

---

### One-Page Layout

The homepage is a single scrollable page with three anchor sections:

- **`/#about`**  intro, profile photo, tech stack, resume PDF link
- **`/#experience`**  interactive company tabs with role details and bullet points
- **`/#projects`**  cover image cards with tech tags and GitHub links

---

### Experience Tabs

Company tabs on the left, role details on the right  vanilla JS, no framework required.
Driven by `_data/experience.yml` for easy updates.

---

### Project Cards

<p align="center">
<img src="readme_preview/projects.png" width="75%">
</p>

Projects are Jekyll collections defined in `_projects/`. Each card shows a cover image, title, description, tech tags, and a GitHub link. Clicking a card opens the full project detail page.

---

### CV Page

A separate `/cv/` page renders from [`assets/json/resume.json`](assets/json/resume.json) (JSON Resume standard) with a PDF download link.

<p align="center">
<img src="readme_preview/cv.png" width="75%">
</p>

---

### Navbar

- **Left**: site name + anchor nav links (about  experience  projects)
- **Right**: social icons (email, GitHub, LinkedIn) + dark mode toggle

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Jekyll](https://jekyllrb.com/) |
| Theme base | [al-folio](https://github.com/alshedivat/al-folio) |
| Styles | SCSS + Bootstrap |
| Templating | Liquid |
| Hosting | GitHub Pages |
| CV data | [JSON Resume](https://jsonresume.org/) |

---

## Running Locally

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`.

Requires Ruby + Bundler. See [INSTALL.md](INSTALL.md) for full setup.

---

## Project Structure

```
_data/
  experience.yml        # Experience tab data
  cv.yml                # CV fallback data
_includes/
  experience_tabs.liquid
  projects_section.liquid
_layouts/
  about.liquid          # One-page homepage layout
_pages/
  about.md              # Homepage content
_projects/              # Project collection (one .md per project)
_sass/
  _onepage.scss         # Custom one-page styles
assets/
  json/resume.json      # JSON Resume data
  pdf/                  # Resume PDF
  img/projects/         # Project cover images
```

---

## License

Site content  2026 Mainul Hossain. Theme base available under the [MIT License](LICENSE).
