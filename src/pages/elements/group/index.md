---
title: The `group` Element
date: "2018-06-30T03:20:03-05:00"
---

#### Contexts

- As a child of `series`
- As a child of `group`
- As a child of `glossary`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
- `type`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">profanity</code></dd>
    <dd><code class="language-text">nudity</code></dd>
    <dd><code class="language-text">sex</code></dd>
    <dd><code class="language-text">violence</code></dd>
    <dd><code class="language-text">drugs</code></dd>
    <dd><code class="language-text">scale</code></dd>
    <dd><code class="language-text">curation</code></dd>
  </dl>
<!--
- `order`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">ascending</code></dd>
    <dd><code class="language-text">descending</code></dd>
    <dd><code class="language-text">custom</code></dd>
  </dl>
 -->

#### Definition

An arbitrary grouping.

#### Examples

1. Marking up a curated list of episodes.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <series xml:id="hughs-vlog">
       <title>Hugh’s Vlog</title>
       <group xml:id="best-of-hughs-vlog" type="curation">
         <video xml:id="episode-01"></video>
         <video xml:id="episode-03"></video>
         <video xml:id="episode-05"></video>
       </group>
     </series>
   </hvml>
   ```

2. Marking up a curated list of episodes from a previously-defined set of episodes.

   For this we must import the `xlink` namespace on the root node, in order to use `xlink:href` to target specific `xml:id`s.

   ```xml
   <hvml
     xmlns="https://hypervideo.tech/hvml#"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xml:lang="en"
   >
     <series xml:id="hughs-vlog">
       <title>Hugh’s Vlog</title>
       <series xml:id="season-01">
         <video xml:id="episode-01"></video>
         <video xml:id="episode-02"></video>
         <video xml:id="episode-03"></video>
         <video xml:id="episode-04"></video>
         <video xml:id="episode-05"></video>
       </series>
       <group xml:id="best-of-hughs-vlog" type="curation">
         <video xml:id="best-of-01" xlink:href="#episode-01"></video>
         <video xml:id="best-of-02" xlink:href="#episode-03"></video>
         <video xml:id="best-of-03" xlink:href="#episode-05"></video>
       </group>
     </series>
   </hvml>
   ```

3. Defining a group of content rating classifications.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="yt" for="ratings">
       <title>YouTube Shows &amp; Movies</title>
       <scheme>http://support.google.com/youtube/bin/answer.py?hl=en&amp;answer=146399</scheme>
       <group type="profanity">
         <rating code="L-" maturity="0" color="green">
           <title>No strong language</title>
         </rating>
         <!-- … -->
         <rating code="L+" maturity="1" color="red">
           <title>Explicit language</title>
         </rating>
       </group>
     </glossary>
   </hvml>
   ```
4. Defining a group of content ranking classifications.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="nstv" for="score" party="1st">
       <title>No Spoon TV Verdicts</title>
       <group type="scale">
         <score xml:id="nstv-u" code="U" rank="0">
           <title>Unwatchable</title>
         </score>
         <!-- … -->
         <score xml:id="nstv-ma" code="Ma" rank="1">
           <title>Masterpiece</title>
         </score>
       </group>
     </glossary>
   </hvml>
   ```
