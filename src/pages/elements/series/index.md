---
title: The `series` Element
date: "2018-07-12T04:12:12-05:00"
---

#### Contexts

- As a <b>child</b> of `hvml`
- As a <b>child</b> of `series`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
- `order`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">ascending</code></dd>
    <!-- <dd><code class="language-text">[ascending | descending] aspirant</code></dd> -->
    <dd><code class="language-text">descending</code></dd>
    <dd><code class="language-text">custom</code></dd>
  </dl>

#### Definition

- As a child of `hvml`: Denotes an episodic story, such as a [Web] television show, miniseries, or theatrical anthology.
- As a child of another `series`: Denotes a distinct arc of an episodic story, such as a “season” (<abbr>US</abbr> parlance) or “series” (<abbr>UK</abbr> parlance). Throughout this specification, the term “season” will be used for this use case to avoid ambiguity.

`series` is for grouping works that canonically relate to one another, as set forth by their author(s). It is not appropriate for marking up independent curation, i.e. putting together an array of standalone works. For that, see <a title="single-page" href="/hvml#group"><code>group</code></a> [<a class="alt-link" href="/elements/group">standalone</a>]

#### Examples

1. Marking up a show with three episodes.

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <series xml:id="hughs-vlog">
       <title>Hugh’s Vlog</title>
       <video xml:id="episode-01"></video>
       <video xml:id="episode-02"></video>
       <video xml:id="episode-03"></video>
     </series>
   </hvml>
   ```
   Note that the `<video>`s’ `xml:id` attributes are just for human-readability. They are optional and do not have to specify episode numbers. Because this `<series>` omits the `order` attribute, its `<video>`s are understood to be in ascending chronological order, and can be numbered automatically by a User-agent.

 2. Marking up a show with three episodes, in reverse chronological order.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
      <series xml:id="hughs-vlog" order="descending">
        <title>Hugh’s Vlog</title>
        <video xml:id="episode-03"></video>
        <video xml:id="episode-02"></video>
        <video xml:id="episode-01"></video>
      </series>
    </hvml>
    ```
3. Marking up a show with six episodes, spread out over two seasons.

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <series xml:id="hughs-vlog">
       <title>Hugh’s Vlog</title>
       <series xml:id="season-01">
         <video xml:id="episode-01"></video>
         <video xml:id="episode-02"></video>
         <video xml:id="episode-03"></video>
       </series>
       <series xml:id="season-02">
         <video xml:id="episode-04"></video>
         <video xml:id="episode-05"></video>
         <video xml:id="episode-06"></video>
       </series>
     </series>
   </hvml>
   ```

   Note that a User-agent might choose to list the episodes in Season 2 as “Episode 4”, “Episode 5”, and “Episode 6”, respectively; or “Season 2: Episode 1”, “Season 2: Episode 2”, and “Season 2: Episode 3” respectively, depending on design decisions.

#### Parsing

A `series`’ children [SHOULD](https://tools.ietf.org/html/rfc2119#section-3) be ordered chronologically, so that simply retrieving a list of them would not require additional computation to sort in the majority of use cases. This is referred to as <dfn>pre-ordering</dfn> on behalf of the document author.

If the `order` attribute is present and set to the exact string `ascending`, then the `series`’ children [MUST](https://tools.ietf.org/html/rfc2119#section-1) be understood as pre-ordered from the earliest date of publication to the latest date of publication.

If the `order` attribute is present and set to the exact string `descending`, then the `series`’ children [MUST](https://tools.ietf.org/html/rfc2119#section-1) be understood as pre-ordered from the latest date of publication to the earliest date of publication.

If the `order` attribute is present and set to the exact string `custom`, then the `series`’ children [SHOULD NOT](https://tools.ietf.org/html/rfc2119#section-4) be understood as pre-ordered in a consistently linear fashion. User-agents wanting to sort a `series`’ children by date anyway in this case should look for grandchild `published` elements. If a given child has no `published` child, its place in a sort is left to the User-agent.

If the `order` attribute is present but set to a <dfn title="Any sequence of characters excluding NULL, the empty string, and pure whitespace">non-empty string</dfn> that the User-agent doesn’t recognize, the pre-order defaults to `custom` to gracefully degrade in the event of future permissible values.

If the `order` attribute is not present, or is present but <dfn title="any of NULL, the empty string, or pure whitespace">empty</dfn>, the pre-order defaults to `ascending`.
<!--
#### Rationale For

- `group` is potentially overloaded, which is currently being used to denote series as well as glossary entries.
- Makes XPath selectors easier to read and write: `hvml/group[@type='series'][1]` vs. `hvml/series[1]`

#### Rationale Against

- Promotes reuse of existing elements rather than creating new ones.
- Users may mistakenly use it to group non-serial content.
 -->
