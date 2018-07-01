---
title: The `series` Element (Proposal)
date: "2018-06-30T05:46:07-05:00"
---

#### Contexts

- As a child of `hvml`
- As a child of `series`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)

#### Definition

- As a child of `hvml`: Denotes an episodic story, such as a [Web] television show, or theatrical miniseries.
- As a child of `series`: A distinct arc of an episodic story, such as a “season” (<abbr>US</abbr> parlance) or “series” (<abbr>UK</abbr> parlance).

#### Rationale For

- `group` is potentially overloaded, which is currently being used to denote series as well as glossary entries.
- Makes XPath selectors easier to read and write: `hvml/group[@type='series'][1]` vs. `hvml/series[1]`

#### Rationale Against

- Promotes reuse of existing elements rather than creating new ones.

#### Examples

1. As a child of `hvml`: Denoting an episodic television show.

   ```xml
   <series xml:id="hughs-vlog">
     <!-- … -->
   </series>
   ```
2. As a child of `series`: Denoting a distinct “season” or “series” of an episodic television show.

   ```xml
   <series xml:id="hughs-vlog">
     <series xml:id="season-01">
       <!-- … -->
     </series>
     <series xml:id="season-02">
       <!-- … -->
     </series>
   </series>
   ```
