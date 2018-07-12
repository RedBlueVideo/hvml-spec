---
title: The `maturity` Element
date: "2018-07-12T04:24:45-05:00"
---

#### Contexts

- As a child of `glossary`
- As a child of `scale`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
- `type`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>Maybe</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">profanity</code></dd>
    <dd><code class="language-text">nudity</code></dd>
    <dd><code class="language-text">sex</code></dd>
    <dd><code class="language-text">violence</code></dd>
    <dd><code class="language-text">drugs</code></dd>
    <dd><code class="language-text">custom</code></dd>
  </dl>
- `code`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
  </dl>
- `rank`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <!-- <dd><code class="language-text">xs:decimal</code></dd> -->
    <!-- <dd><code class="language-text">xs:integer</code></dd> -->
    <dd><code class="language-text">xs:nonNegativeInteger</code></dd>
    <dt>Values:</dt>
    <dd>Range: 0–1 inclusive</dd>
  </dl>
- `color`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <!-- <dd><code class="language-text">red</code></dd>
    <dd><code class="language-text">orange</code></dd>
    <dd><code class="language-text">yellow</code></dd>
    <dd><code class="language-text">green</code></dd>
    <dd><code class="language-text">blue</code></dd>
    <dd><code class="language-text">indigo</code></dd>
    <dd><code class="language-text">violet</code></dd> -->
    <dd>Any valid <a href="https://www.w3.org/TR/2018/REC-css-color-3-20180619/">CSS color</a> value</dd>
  </dl>

#### Definition

A predefined maturity rating with which a reviewer can classify a piece of content.

If a `maturity` element has `scale` as its parent, then the `type` attribute is optional.

If a `maturity` element does not have `scale` as its parent, then the `type` attribute is required.

#### Examples

1. Defining two maturity ratings, in a scale from least profane to most profane.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="yt" for="ratings">
       <title>YouTube Shows &amp; Movies</title>
       <scheme>http://support.google.com/youtube/bin/answer.py?hl=en&amp;answer=146399</scheme>
       <scale type="profanity">
         <maturity code="L-" rank="0" color="green">
           <title>No strong language</title>
         </maturity>
         <!-- … -->
         <maturity code="L+" rank="1" color="red">
           <title>Explicit language</title>
         </maturity>
       </scale>
     </glossary>
   </hvml>
   ```
2. Defining a single maturity rating, with an implied rank of `1`.

  ```xml
  <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
    <glossary xml:id="f-bombs" for="ratings">
      <title>Any F-Bombs?</title>
      <maturity type="profanity" code="F">
        <title>One or More F-Bombs</title>
      </maturity>
    </glossary>
  </hvml>
  ```
