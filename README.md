# Historic Timeline — An Atlas of Humanity

A free, static, responsive educational app exploring human history from roughly 300,000 years ago to the present.

## Open the app

Open `index.html` in a modern browser, or enable GitHub Pages under **Settings → Pages → Deploy from branch → main / root**. No API key, build step, account, subscription, or server is required.

## Implemented features

- Multi-scale timeline with BCE/CE navigation, nearby milestones and broad historical eras.
- Search and filtering by historical theme and region.
- Schematic geographic map showing selected societies active in the chosen year.
- Civilization profiles and side-by-side comparisons of government, economy, society and belief.
- Human development tracks, cross-domain connections, and historical-pattern explanations.
- Selected historical figures, religions/philosophy, wars, economic developments, science, and everyday life.
- Dated milestones for the historical data section.
- Local-browser study notes, event bookmarks and JSON export.
- Confidence/date labels (documented, approximate, traditional) and links to research starting points.
- Responsive atlas-inspired layout.

## Important limitations

This is an initial curated **educational prototype**, not an exhaustive or scholarly validated database. The map now uses approximate WGS84 reference-center coordinates with a simplified SVG continental outline. It is not a GIS basemap, territorial reconstruction or historical border dataset. The dataset is small, and its global coverage is uneven. The historical data section does not yet provide defensible quantitative time series. Sources are introductory institutional references rather than item-level citations. The bookmark button saves the event as a local note; repeated clicks on the same event are deduplicated. Notes live in browser localStorage and are not synchronized across devices.

Periods are heuristic and not universally applicable. Date confidence labels indicate broad date character, **not a quantified probability or independent source audit**.

## Development and tests

Requires Node.js 18+ only for testing:

```sh
npm test
```

No runtime dependencies.

## Next improvements

1. Separate event content into versioned structured datasets with individual source references and editorial review.
2. Implement real georeferenced world map layers with date-aware territorial uncertainty.
3. Add accessible timeline keyboard controls and richer focus management.
4. Build defensible historical quantitative visualizations with provenance and uncertainty.
5. Expand representation of African, American, Oceanian, Asian and indigenous histories.
6. Add note import, deduplication and optional cross-device synchronization.

## License

MIT.

## Global history expansion

The app now loads additional curated milestones from `data/expanded-events.js`, broadening coverage of Africa, Asia, the Americas and the Pacific. Dates remain approximate where indicated; entries have not undergone individual source verification. See [Historical editorial standards](docs/HISTORICAL_STANDARDS.md) for the evidence and review roadmap.

## Research links and continuous integration

Selected milestones display suggested institutional reading links from `data/reading-links.js`. These links are not individually audited as direct evidence for each claim. Most events still need specific citations and scholarly review.

GitHub Actions now runs JavaScript syntax checks and the Node unit-test suite on pushes and pull requests to `main`. Check the **Actions** tab for actual run results; adding the workflow does not by itself verify a passing test run.

Bookmarks now identify events by title rather than year to avoid confusing different events in the same year, and repeated clicks on the same event do not add duplicate saved notes.

## Geographic reference map (next phase)

`data/locations.js` records approximate latitude/longitude for selected historical centers. The app projects these onto a simplified equirectangular SVG world map and filters active societies by the chosen year. The coastlines are hand-simplified shapes and **not** accurate GIS polygons; points do **not** indicate the extent of empires or civilizations. Map geometry is covered by unit tests. The next step is a properly sourced basemap and uncertainty-aware historical spatial datasets.

## Expanded society atlas

`data/expanded-societies.js` adds fifteen society profiles with approximate historical date ranges, regional contexts and georeferenced centers. The map supports filtering by region and toggling marker labels. These points are **reference centers**, not territorial extents. Many profiles span centuries of political change and should not be interpreted as stable borders. The map remains a simplified reference illustration, not a GIS dataset. The new profiles are covered by automated data-validation tests.

## Comparative chronology

The Historical Data panel now includes an interactive SVG chart showing approximate start/end periods of curated society profiles. Choose ancient, classical, medieval or modern windows, and optionally highlight one society. The chart responds to the selected timeline year and lists selected economic/scientific milestones for the current window. Bars indicate editorially approximate date ranges **only**: they do not quantify influence, territory, population or economic output. Overlap is not evidence of contact or causation.

## Phase 9 stabilization

- `src/model.js` provides a shared, validated event/society model with stable IDs and geographic coordinate checks. The existing UI continues using legacy event arrays during migration, so this is an incremental normalization rather than a full rewrite.
- `src/styles/atlas.css` contains the extracted stylesheet.
- `src/storage.js` safely reads and writes notes using the **unchanged** `historic-timeline-notes-v1` localStorage key. Existing notes remain in place. If storage is blocked, saving displays an error instead of silently failing.
- Historical display rejects year zero; the main year input moves zero to 1 CE. Legacy negative BCE dates retain their prior meaning.
- `tests/model-integration.test.js` loads the full browser dataset in an isolated environment and checks validation, uniqueness, chronological conventions, and note compatibility.
- `tests/browser-smoke.mjs` uses Chromium/Playwright to test initialization, filters, map, chronology, note persistence and year-zero behavior. Run with `npm install && npx playwright install chromium && npm run test:browser`. Playwright is a **development-only** dependency; the deployed application remains dependency-free.

The interface and historical content are not yet fully modularized; future work should progressively extract map, timeline and comparison renderers into dedicated modules without changing saved-note keys.
