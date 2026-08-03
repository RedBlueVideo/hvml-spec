# HVML Identity, Versions, and Presentations

**Status:** Reviewed and accepted 2026-08-03. Decisions recorded here were reached in design sessions on 2026-08-02 and 2026-08-03; §§2.6–2.8 (decentralized minting, registration, script policy) were added later the same day and ratified on review.
**Scope:** the HVML format and its registry; the Atom review format that consumes both. Database and CMS architecture for Montage is deliberately out of scope here; it belongs in a `nospoon-zine` ADR.

---

## 1. Background and goals

The eXist-era system stored film reviews as Atom entries with a colocated OVML record (`<a:entry>` + `<ovml:ovml>`), queried by XQuery (`nospoon.xq` survives and encodes the structure). We are rebuilding that format on modern HVML, with these requirements:

1. A storage format: XML, with a JSON-LD twin producing identical triples. RDFa is the third serialization, emitted in rendered HTML. Any renderer (Next.js today) is a consumer, never the authority.
2. Documents survive arbitrary databases.
3. Review prose and film record colocate in one document.
4. A consumer can embed an HVML record inline *or* link to an external one, and both must denote the same work.
5. HVML competes with schema.org and WebVTT: we import no vocabulary or naming from either. Equivalence and reference links use RDF-layer primitives (`owl:sameAs`, `rdfs:seeAlso`), which carry no domain claims about video.

Requirement 4 is free in RDF, but only for subjects with IRIs. Measured on `nospoon-zine/data/drive-2011.jsonld`: 165 triples, 47 subjects, all blank nodes. Nothing in HVML mints an IRI today. Identity therefore comes first.

## 2. Identity

### 2.1 Three roles, no overlap

| Mechanism | Role | Scope | Example |
|---|---|---|---|
| `xml:id` | intra-document handle; mints when a base is declared | one document | `#theatrical`, `<link rel="derived-from" href="#drive-2005-book"/>` |
| IRI | the work's name | global | `https://id.nospoon.tv/2011/drive` |
| `<urn>` | registry-assigned identifier (ISAN, EIDR): an ISBN-for-films | global, optional, often absent | `urn:isan:…` |

`<urn>` never carries primary identity: festival premieres and personal works have no ISAN, the way manuscripts have no ISBN. It joins the equivalence set (§2.3).

### 2.2 Minting and citing

Two rules govern every subject:

- **`xml:id` mints.** Resolved against `xml:base`, it produces the subject IRI: `@id = base + '#' + xml:id`. The primary child of `<hvml>` mints the base IRI itself, with no fragment. Every other `xml:id` mints a fragment.
- **`about` cites.** An absolute IRI referencing a subject the document does not own.

A copy of a document keeps its global names because `xml:base` travels with it. A document with no base mints only local names; a personal file on a NAS stays private by default, with nothing to configure.

The JSON-LD twin requires a context rule producing the same IRIs; note that a bare relative `"theatrical"` resolves as a sibling *path*, not a fragment, so the mapping must emit `#`-prefixed relative IRIs (or absolutes).

### 2.3 The registry: `id.nospoon.tv`

Follows the old system's subdomain-per-function precedent (`vocab.`, `atom.`). `hypervideo.tech` stays dedicated to the specification and libraries; it runs no registry.

**Paths are year-namespaced:** `https://id.nospoon.tv/2011/drive`. Rationale: the year is film culture's own disambiguator ("Drive (2011)"), and it dissolves the primary collision class; the 1997 *Drive* never contends with the 2011 one. Rules:

- A.) The year is frozen at mint: the year of first public exhibition (witnessed by the work's earliest `<showing scope="release">`), else the creation or recording year for unreleased and personal works.
- B.) Never re-derived. Scholarship that re-dates a film corrects the `<showing>` data; the path is a name, not a claim.
- C.) Same-title-same-year takes Roman-numeral suffixes from the second entity on: `/2011/drive-ii`.

Slug derivation and script policy: §2.8.

**The registry is not a catalogue.** It holds identity and disambiguation only: title, year, principal credits sufficient to prove which work is meant, the equivalence set, and the canonical HVML record. No synopses, posters, accounts, ratings, or reviews. Entries are minted on demand when something needs naming, never bulk-imported. When Wikidata or ISAN already names a work and a bare reference suffices, citing theirs stays conforming; a registry entry earns its place when HVML dereference or version fragments are needed, and anchored registration (§2.7) records the equivalence at creation.

**Equivalence set:** `<urn>` values and Wikidata items map to `owl:sameAs` (the linked resource *is* the work). `<link rel="info">` pages (IMDb, TMDb, Letterboxd, Wikipedia) map to `rdfs:seeAlso` (the linked resource is *about* the work). Conflating these would let a reasoner merge a shop listing's properties into the film; the split is load-ordered into the vocabulary, not left to consumers.

### 2.4 Dereference: the id/doc pattern (303)

**Adopted 2026-08-03, amending an earlier 200-based design.** The work IRI answers `GET` with `303 See Other`, negotiating the record's representation:

```
GET /2011/drive HTTP/1.1
Accept: application/ld+json

303 See Other
Location: /2011/drive.jsonld
Vary: Accept
```

```
GET /2011/drive.jsonld

200 OK
{ "@id": "https://id.nospoon.tv/2011/drive", … }
```

- The work IRI is never the target of a `2xx`, so under the httpRange-14 resolution it remains free to name a non-information resource. Strict clients stay satisfied; the film and its record never share a subject.
- The record documents (`.hvml`, `.jsonld`, `.html`) are honest information resources with their own IRIs, and record metadata (modified dates, record licensing) attaches to them.
- Fragments compose correctly: a client resolving `…/2011/drive#theatrical` strips the fragment, receives the 303, and re-attaches the fragment to the Location target per RFC 9110 §10.2.2 (a fragmentless Location inherits the request's fragment). The retrieved document declares `xml:base`/`@base` as the *work* IRI, so subjects mint against the canonical base, not the document URL.
- Cost: one extra round trip, on a warm HTTP/2+ connection and cacheable at the CDN. The 2007-era argument against 303 priced per-request TCP+TLS handshakes that no longer exist.

This is the W3C *Cool URIs* id/doc pattern (deployed by data.gov.uk's `/id/`→`/doc/`, DOI in spirit). The registry's own subdomain, `id.`, already names the first half of it. Serving the record with `200` directly at the work IRI is the semantic equivalent of shipping errors under `200 OK`: convenient, common, and wrong in a way the status codes were designed to express.

### 2.5 Fragments and media types

RFC 3986 §3.5 delegates fragment semantics to the retrieved representation's media type. In generic `application/xml`, `#theatrical` names an XML *element*; in JSON-LD, a graph *node*; and W3C fragment best practices require content-negotiated representations to agree. HVML therefore needs its own media-type registrations (e.g. `application/hvml+xml`) whose fragment sections define a fragment as naming **the entity described by** the element bearing that `xml:id` — the move Turtle's registration makes by delegating to RDF. This is also the natural first IETF deliverable: media types are registered with IANA under RFC 6838, independent of ratifying the full specification.

### 2.6 Minting authority is decentralized

Two rules extend §2.2 onto the wire:

- **Mint only under a domain whose dereference you control.** `xml:base` declares who answers for a name. Declaring someone else's authority is not minting, it is citing; and citing a name that was never registered is a citation error, which the wire reports truthfully as `404`.
- **Cite anything that exists.** Foreign authorities naming our works, and ours naming theirs, is the system operating as designed.

**"Identity authority" is a role, not an instance.** Any host serving work IRIs under the id/doc contract (§2.4) with HVML media types (§2.5) holds the role. `id.nospoon.tv` is the first deployment, not *the* registry; its year-path convention is local practice, recommended to other authorities but not required of them. A publisher who wants no dependency on anyone mints under their own domain (`https://annotations.example/1995/heat`) and joins the wider graph through the §2.3 equivalence set. This is the posture specifications take generally: RFCs define *authorization server*, never *Google's OAuth endpoint*.

Names outlive dereference. RDF merges subjects by IRI equality, not by retrievability; two documents citing the same IRI merge whether or not a `GET` succeeds. A `404` therefore degrades discovery — follow-your-nose stops — never identity. Registration (§2.7) is the service that keeps discovery working; it is not what makes a name a name.

### 2.7 Registration

Documents mint (§2.2); registries **register**. The protocol below is operational guidance for `id.nospoon.tv` and for any authority wanting compatible behavior. It is not format-normative: an HVML document parses offline with no registry on Earth.

The gate is verifiability, not human judgment:

- **Anchored registration.** The request carries an external authority identifier (Wikidata, ISAN, EIDR, IMDb, TMDb). The registry dereferences the identifier itself and takes title and year *from the authority rather than the requester*: no typo can misfile a film, and no requester can dress one film as another. It derives the slug (§2.8) and consults a reverse index of external identifiers. Match: `200` with the existing IRI. No match: `201 Location:` the new one. Register-or-return, idempotent by construction, so concurrent registrants converge on one name. Fully automated, synchronous, rate-limited; no account required.
- **Unanchored registration.** No external authority names the work: festival prints, workprints, personal files — the long tail that is HVML's differentiator. Authenticated, provenance-recorded, and *instant*. The Wikidata/MusicBrainz lesson is to gatekeep merges, not mints: a pre-approval queue would put friction exactly on the works nobody else can name. Post-registration patrol (fuzzy title+year matching, machine-assisted, human-confirmed) queues suspected duplicates; a confirmed duplicate merges by asserting registry-internal `owl:sameAs`, marking one IRI canonical, and answering at both forever.

Anchored registration writes its external correspondences into the §2.3 equivalence set at mint time. Equivalence is thereby captured when it is cheap (creation) instead of reconstructed when it is expensive (post-hoc federation aggregators that may never exist).

`GET /api/lookup?wikidata=Q174284` answers the canonical IRI, else `404`. Machines resolve through lookup; slug derivation (§2.8) is a mnemonic for humans, never a resolution protocol.

**The 404 is an affordance.** An unregistered path answers `404` carrying, by content negotiation: for `text/html`, a search box over the lookup index and a registration flow accepting a pasted authority URL; for `application/problem+json` (RFC 9457), extension members naming the register and lookup endpoints and the accepted identifier schemes, so a conforming client can offer one-click repair instead of failing. `GET` never registers — method safety (RFC 9110 §9.2.1) is not negotiable — but the `404` hands over the `POST` that would.

Authoring tools close the loop. Software that stamps `about` values resolves identity at creation time (search, pick, register-or-return), so its authors never see an IRI, and a `404` in the wild marks hand-authored work by someone who skipped the affordance built to prevent it.

Registry data is released CC0. Identity facts are the one dataset that must be maximally unencumbered; priced identity would send publishers around the registry and forfeit the convergence it exists for. Sourcing follows the same logic: store correspondences from CC0 sources where possible (Wikidata cross-references TMDb via P4947); TMDb's own API terms need diligence before its records seed anything (§8).

### 2.8 Slugs: script policy and derivation

**Slugs are native-script IRIs.** The original title, in its original script: `/1967/le-samouraï`, `/1950/羅生門`. No romanization, no diacritic stripping. Grounds:

- A.) Authority: a film tends to have one native title and many localizations. The localizations are claims about markets; the native title is the name. An identity registry that renames world cinema into ASCII asserts an Anglophone lens at the layer least entitled to one.
- B.) Determinism: romanization is system-relative (Hepburn vs. Kunrei; competing pinyin and Arabic schemes), so an ASCII rule would have to embed a transliteration table in the derivation algorithm. Native script under precomposed Unicode (Normalization Form C) is single-valued.
- C.) Standing: internationalized identifiers are the IETF's own direction (RFC 3987); an IRI registry apologizing for non-ASCII would argue against its own submission.

**Derivation**, from the anchoring authority's original title (Wikidata P1476; declared by the registrant when unanchored): precomposed Unicode normalization; default case-folding where the script has case; whitespace to hyphens; characters neither letter nor number dropped. The precise character-class table is deferred (§8). Collisions take §2.3's Roman-numeral suffixes; native script shrinks the collision class, since a same-year English-language *Rashomon* never contends with 羅生門.

Costs, priced honestly:

- **Spelling variance.** RDF compares IRIs by simple string equality, so `…/羅生門` and its percent-encoded form are *different subjects*; careless round-trips through URI-land split the graph. DBpedia's percent-encoding history is the cautionary tale, and Wikidata's retreat to opaque Q-IDs was partly this — opacity being the cost we refuse. Rules: the canonical spelling is the native precomposed form, and identity derives from record *content* (the declared `xml:base`), never from storage artifacts like filenames — filesystems that decompose Unicode (macOS) can then never corrupt a name; the registry emits only the canonical spelling in records, `Location` headers, and API responses; citations MUST use it; HVML processors SHOULD normalize percent-encoded forms of work IRIs back to native precomposed characters on ingest (RFC 3987 §5).
- **Homographs.** A Cyrillic-е `/1995/hеat` is a spoof of the Latin one. Anchored derivation closes most of the surface: the slug comes from the authority's title, so spoofing requires corrupting the authority first. Residual rules, per IDN practice: single-script slugs only (mixed-script rejected), and UTS #39 confusability screening against same-year siblings, escalating to patrol rather than automatic suffixing.
- **Typability.** Nobody should type an identity IRI: machines use lookup, tools stamp at creation, humans copy-paste. For the QWERTY case the registry MAY reserve a romanized courtesy path answering `308 Permanent Redirect` to the canonical IRI. Aliases are not names: never emitted in records, never correct to cite; the `308` exists to tell whoever arrived where the name lives. The alias transliteration table is deferred (§8).

## 3. The version layer

`<version>` is the expression-layer element: which content this is, as distinct from which work (`<video>`) and which artifact (`<presentation>`, `<file>`).

```xml
<video xml:id="drive" type="narrative">
  <title xml:lang="en">Drive</title>
  <version xml:id="theatrical" type="theatrical">
    <runtime>5880</runtime>
    <fps rate="24000" scale="1001"/>
  </version>
</video>
```

- **Name.** `<cut>` was rejected: the playlist vocabulary is one in/out-point away from an EDL (`<media>` + `clipBegin/clipEnd`-style trimming), and *cut* is the word transition vocabulary will demand there. `<edit>` rejected: verb reading, and EDL "edit events" collide head-on. `<version>` additionally matches V-ISAN, whose added segment names exactly this layer, and covers the indie case where file revisions *are* the editorial versions (`type="workprint" datetime="…"`).
- **Grammar posture.** Optional, repeatable child of `<video>`. Absent means the video has one implicit version; every existing document is grandfathered.
- **Targeting.** `<showing>` and `<presentation>` declare which version they present by containment (child of `<version>`), by `<link rel="presents" href="…"/>` (fragment locally, absolute cross-document), or not at all, which means the sole implicit version. One relation, `presents`, serves both: an event presents a version; an artifact presents a version.
- **Reference timeline.** The version owns the nominal timeline annotations are authored against. Each presenting resource may declare its mapping onto it (provisional element, not yet ratified):

  ```xml
  <sync offset="21.5" rate="24" scale="25"/>  <!-- PAL speedup after a 21.5s ident -->
  ```

  `local = offset + reference × rate/scale`, integer pairs per the `<fps>` idiom. Linear-only by design; repeating `<sync>` with segment boundaries is reserved for piecewise maps (roadshow overtures, broadcast edits) and deliberately unbuilt.

Layered selection, each rung filtered by a criterion proper to it:

| Level | Differentiates | Selected by |
|---|---|---|
| `<video>` | which work | the person |
| `<version>` | which content | the person |
| `<presentation>` | which timing/experience | context and capability |
| `label` group | which logical asset | instructions, via xpointer |
| `<file>` | which bytes | the UA: `canPlayType()`, bandwidth |

The `<file>` rung is also where the information-resource boundary falls: a file's bytes can be transmitted; a version or work cannot, only described.

## 4. Presentations

Four changes, R1–R4, all backward-compatible; every existing document remains valid.

- **R1 — Repeatable.** Zero or more presentations per video or version. Selection rule: **document order is preference order, and a conforming player plays the first presentation it can play.** "Can play" excludes media it cannot decode and versions it cannot source. Anything smarter — user preference, display heuristics — is a player feature, not a format obligation. Selection *menus* are authored constructs: a `<choicePrompt>` whose choices activate presentations is a DVD menu, written by someone who wanted one.
- **R2 — Addressable.** Optional `about` IRI, minted by whoever owns the presentation, under their own authority. A third party names their annotation track under their own domain and links it into the work graph; the registry is never its custodian. Absent `about`: a blank node, document-local, as today.
- **R3 — Targeted.** Per §3: containment, `rel="presents"`, or the implicit sole version.
- **R4 — Files optional** (ratified, not changed). An instruction-only presentation is conforming; `hvml-spec/static/hvml.xml` already is one, playing from its showing's venue. Instruction-only presentations can never satisfy "can play" and so self-exclude from source selection; they are experiences composed onto a playing source when the user opts in.

An independently published annotation track is therefore an ordinary partial HVML document — no new top-level element:

```xml
<hvml xmlns="https://hypervideo.tech/hvml#" xmlns:xlink="http://www.w3.org/1999/xlink">
  <video about="https://id.nospoon.tv/2011/drive">
    <presentation about="https://cine.example/tracks/drive-trivia">
      <link rel="presents" href="https://id.nospoon.tv/2011/drive#theatrical"/>
      <overlay xml:id="scorpion-jacket" on="duration" start="1284.5" end="1290"
               width="40%" top="70%" left="5%">
        <content type="xhtml">
          <div xmlns="http://www.w3.org/1999/xhtml">Refn commissioned four scorpion jackets.</div>
        </content>
        <goto xlink:actuate="onRequest" xlink:href="https://cine.example/sources/refn-interview"/>
      </overlay>
    </presentation>
  </video>
</hvml>
```

It merges with the registry's record by shared IRI; a client holding any encode of the theatrical version maps overlay times through its own `<sync>`.

The track carries no footage of the work it annotates: timecodes and overlay content are the publisher's own authorship, the same separation that lets subtitle files circulate independently of the films they subtitle. Authoring needs no copy of the work server-side either: an editor can scrub a user-supplied local file client-side, publish only the document, and leave the pixels where they were licensed.

## 5. Overlay vocabulary

- **`<overlay>`** is the standalone time- and space-scoped unit (production-floor term: "text overlay", "graphic overlay"). Geometry and timing live on the overlay, which renders whether or not it is interactive.
- **`<content type="xhtml">`** carries the payload, joining the `<description type="xhtml">` typed-payload idiom and paralleling Atom's element of the same job. Honest for future non-text payloads.
- **`<goto>`** reduces to optional pure action.
- **`<choice>` remains a distinct semantic element** — an option in a decision — and is restricted to `<choicePrompt>`. It is not an overlay subtype: the corpus already renders choices three ways (RedBlue's Shadow-DOM nav; hit-regions over pixels baked into wait screens, per `displayType="generate|embedded"`; drawn overlays). Grammar reuse comes from shared RELAX NG patterns (timing/geometry attribute groups, the content model), not shared names.
- Rejected, with reasons recorded: `<annotation>` (the abstract collective term — matching RedBlue's `Annotation[]` interface — not an element); `<text>` (unnecessary; `<content>` + XHTML covers it); `<cue>` (WebVTT's term; HVML imports no naming from competitors, and it fails the familiar-vocabulary test); `hotspot` (marketing term; a choicePrompt is itself a collection of them); `<name>` as payload carrier (honest only as a label among alternatives; it stays under `<choice>`, `<entity>`).

## 6. The Atom review format

Atom carries exactly what HVML declines to model: prose, authorship, publication, review identity, feed distribution. RFC 4287 permits the foreign-namespace child; RFC 6903 registers `rel="about"`.

```xml
<entry xmlns="http://www.w3.org/2005/Atom"
       xmlns:h="https://hypervideo.tech/hvml#">
  <id>https://montage.nospoon.productions/articles/drive-2011</id>
  <title>Drive</title>
  <author><name>Hugh Guiney</name></author>
  <published>2011-09-16T00:00:00Z</published>
  <link rel="about" href="https://id.nospoon.tv/2011/drive"/>
  <content type="xhtml">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <p>… <cite about="https://id.nospoon.tv/1967/le-samouraï">Le Samouraï</cite> …</p>
    </div>
  </content>
  <h:hvml><!-- optional embedded partial record; merges with the registry's by IRI -->
    <h:video about="https://id.nospoon.tv/2011/drive">…</h:video>
  </h:hvml>
</entry>
```

- A review reviews the *work*; when the version watched matters, the embedded record says which.
- The mention harvest (reviving `nospoon:getVideoMentions`) reads RDFa `about` from `<cite>` elements in the content; fallback chains stay prose-first, then the record, per the recovered XQuery.
- Montage's article URL and the registry IRI are independent namespaces by design; the entry `<id>` is the article URL, the subject of the review is the registry IRI.
- A review may itself ship an instruction-only presentation of time-anchored overlays — the review becomes watchable over any encode of the version it presents. This falls out of R2–R4 with no review-specific machinery.

## 7. Where the work lands

| Piece | Repo |
|---|---|
| `<version>`, mint/cite rules, R1–R4, `<overlay>`/`<content>`, `<sync>` | `hvml` (grammar, JSON-LD context, library) |
| Element documentation, this design's normative write-up, media-type registration text | `hvml-spec` |
| Presentation selection, overlay rendering, version-aware sync | `redblue` |
| Registry service (303 conneg, register-or-return API, lookup, patrol) | new, `id.nospoon.tv` |
| Identity resolution at authoring time (film picker → register-or-return) | `redblue-annotate`, `redblue-annotate-backend` |
| Atom review format implementation, storage ADR, TSX→document migration | `nospoon-zine` |

## 8. Deferred and open

- Piecewise `<sync>` (reserved, unbuilt).
- Media-type registrations and their fragment-semantics sections (§2.5).
- The JSON-LD context mint rule (`#`-prefixing) and the seven known compact-IRI conflicts in the current context.
- `drive-2011.hvml` fixture: `type="feature"` predates the current `narrative|documentary|ad|personal|historical` taxonomy.
- `<choicePrompt>`'s own `<name>` child was left untouched; review its payload semantics when overlays land.
- Slug derivation character classes (punctuation, case-folding edges) and the courtesy-alias transliteration table (ICU Any-Latin is the candidate).
- Collision-ordinal syntax: hyphen suffix (`/2011/drive-ii`, current) vs. ordinal path segment (`/2011/drive/ii`) — revisit before registry v1. Either way, the registry-generated Roman-numeral ordinal is exempt from §2.8's single-script rule: it is registry vocabulary, not registrant input, so it carries no spoofing surface.
- Registry governance: the operator of `id.nospoon.tv` versus the identity-authority role; revisit when the PBC question settles.
- Discovery service (which documents cite a given IRI): deliberately outside the registry's v1 scope.
- TMDb API terms: verify what anchored registration may store from their records; prefer Wikidata (CC0) for stored correspondences.
- Montage database/CMS ADR (`nospoon-zine`, next session): staged commitment — files in git now, BaseX as build-time query engine, CMS layer when the masthead grows; the Atom+HVML document is the canonical interchange artifact regardless of store.
