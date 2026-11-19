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

This is an initial curated **educational prototype**, not an exhaustive or scholarly validated database. The schematic map uses approximate screen coordinates, not geographic boundaries or GIS layers. The dataset is small, and its global coverage is uneven. The historical data section does not yet provide defensible quantitative time series. Sources are introductory institutional references rather than item-level citations. The bookmark button saves the event as a local note, and repeated clicks can create duplicates. Notes live in browser localStorage and are not synchronized across devices.

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
