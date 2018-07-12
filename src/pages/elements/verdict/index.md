---
title: The `ranking` Element
date: "2018-07-12T03:13:27-05:00"
---

#### Contexts

- As a child of `glossary`
- As a child of `scale`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
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
    <dd><code class="language-text">xs:nonNegativeInteger</code></dd>
    <dt>Values:</dt>
    <dd>Range: 0–1 inclusive</dd>
  </dl>

#### Definition

A predefined verdict with which a reviewer can rank a piece of content.

#### Examples

1.
   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="nstv" for="score" party="1st">
       <title>No Spoon TV Verdicts</title>
       <scale type="review">
         <ranking xml:id="nstv-u" code="U" rank="0">
           <title>Unwatchable</title>
         </ranking>
         <!-- … -->
         <ranking xml:id="nstv-ma" code="Ma" rank="1">
           <title>Masterpiece</title>
         </ranking>
       </scale>
     </glossary>
   </hvml>
   ```
