# Phase 11 — Historical research standards

## Scope and limitations

This phase introduces a **provenance workflow**, not a claim that the entire atlas has been fact-checked. The existing milestone list remains intact. `src/research.js` supplies optional metadata for selected titles. Events without metadata explicitly say **No event-level source assigned**.

The linked institutional pages are **reading leads**, not proof that every associated date or statement has been individually verified. A source can support the general topic without supporting the precise wording or dating of a milestone.

## Date interpretation

- `year`: the original milestone year in the atlas; signed BCE/CE, without year zero.
- `dating.earliest` and `dating.latest`: an **editorial illustrative interval** unless a specific published dating method and citation are attached.
- `dating.kind=year`: year-level precision in this application; not a claim of complete temporal certainty.
- Periods used for societies are **broad historical spans**, not statistical confidence intervals or precise state borders.
- Historical uncertainties must not be collapsed into artificial single-year certainty.

## Sources

Each research source has a stable key, institution, title, HTTPS URL and source type. When expanding coverage, add:
1. A specific work or collection record with author/editor and publication/update date when available.
2. The exact event claim the source supports, including a page, section or stable item identifier where possible.
3. Whether the reference is primary evidence, secondary scholarship or an institutional overview.
4. A verification date and a clear distinction between scholarly consensus and contested interpretation.

Do not label the current reading links as **verified citations** until the underlying claims have been checked.

## Historical connections

The connections panel uses named societies, mechanisms, interpretive descriptions and explicit caveats. The three initial examples have **no individually assigned sources**, and must be read as research hypotheses or thematic summaries, not confirmed direct causal relationships.

For future links, distinguish documented contact, inferred exchange, contested influence, coincident development and causal explanation. Evidence for a route or contact does not automatically establish the direction or magnitude of influence.

## Society research profiles

Society profiles reuse existing governance, economy, social organization, belief, geography and period fields. Nearby events are selected by **regional-category and temporal overlap**, which is a discovery aid only. It is not evidence that the society caused or participated in each event.

## Maintenance

Run `npm test` for metadata, URL, date, canonical-name and HTML escaping checks. Run `npm run test:browser` after installing Playwright for integration coverage. Preserve the localStorage notes key `historic-timeline-notes-v1`.

## Next editorial pass

Prioritize claim-level citation verification, bibliographic fields, uncertainty type (date-range versus statistical confidence), and better regional taxonomy before adding large volumes of records.
