module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: {
    // Protect all one-page layout classes from being purged
    patterns: [
      /^onepage-/,
      /^section-/,
      /^exp-/,
      /^project-card/,
      /^projects-section/,
      /^social-footer/,
      /^resume-link/,
      /^navbar-social/,
    ],
  },
};
