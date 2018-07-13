---
title: The `scale` Element
date: "2018-07-12T04:12:01-05:00"
---

#### Contexts

- As a child of `glossary`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
- `type`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>Yes</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">profanity</code></dd>
    <dd><code class="language-text">nudity</code></dd>
    <dd><code class="language-text">sex</code></dd>
    <dd><code class="language-text">violence</code></dd>
    <dd><code class="language-text">drugs</code></dd>
    <dd><code class="language-text">verdicts</code></dd>
    <dd><code class="language-text">custom</code></dd>
  </dl>

#### Definition

A predefined scale with which a piece of content can be rated or ranked.

#### Examples

1. Defining a maturity scale, from least profane to most profane.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="yt" for="ratings">
       <title>YouTube Shows &amp; Movies</title>
       <scheme>http://support.google.com/youtube/bin/answer.py?hl=en&amp;answer=146399</scheme>
       <maturity type="profanity">
         <maturity code="L-" rank="0" color="green">
           <title>No strong language</title>
         </maturity>
         <!-- … -->
         <maturity code="L+" rank="1" color="red">
           <title>Explicit language</title>
         </maturity>
       </maturity>
     </glossary>
   </hvml>
   ```
2. Defining a verdict scale, from least enjoyable to most enjoyable.
  ```xml
  <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
    <glossary xml:id="nstv" for="score" party="1st">
      <title>No Spoon TV Verdicts</title>
      <verdict xml:id="nstv-u" code="U" rank="0">
        <title>Unwatchable</title>
      </verdict>
      <!-- … -->
      <verdict xml:id="nstv-ma" code="Ma" rank="1">
        <title>Masterpiece</title>
      </verdict>
    </glossary>
  </hvml>
  ```

#### Parsing

If the `type` attribute is present and set to the exact string `verdicts`, then any `<maturity>` children [MUST](https://tools.ietf.org/html/rfc2119#section-1) be ignored<!-- when determining the valid range of a scale-->.

If the `type` attribute is present and set to any string other than `verdicts` (such as `profanity`, `nudity`, `sex`, `violence`, `drugs`, or `custom`), then any `<verdict>` children [MUST](https://tools.ietf.org/html/rfc2119#section-1) be ignored.

If the `type` attribute is present and set to a <dfn title="Any sequence of characters excluding NULL, the empty string, and pure whitespace">non-empty string</dfn> that the User-agent doesn’t recognize, the `<scale>` defaults to type `custom` to gracefully degrade in the event of future permissible values.

If the `type` attribute is present and set to the exact string `custom`, then the `<scale>` has nonstandard semantics which the User-agent [MAY](https://tools.ietf.org/html/rfc2119#section-5) infer from heuristics.

If the `type` attribute is not present, or is present but <dfn title="any of NULL, the empty string, or pure whitespace">empty</dfn>, the `<scale>` is invalid and [MUST](https://tools.ietf.org/html/rfc2119#section-1) be ignored.
