---
title: The `rating` Element
date: "2018-07-12T19:49:32-05:00"
---

#### Contexts

- As a child of `glossary`
- As a child of `rating`

#### Content Attributes

<!-- <details> -->
- XML Global Attributes (e.g. `xml:id`)
- `type`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>Maybe</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">drugs</code></dd>
    <dd><code class="language-text">nudity</code></dd>
    <dd><code class="language-text">profanity</code></dd>
    <dd><code class="language-text">sex</code></dd>
    <dd><code class="language-text">suggestive-dialogue</code></dd>
    <dd><code class="language-text">violence</code></dd>
    <dd><code class="language-text">custom</code></dd>
  </dl>
- `code`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Purpose:</dt>
    <dd>Sets a <a href="/glossary#locally-unique-identifier">locally-unique identifier</a> for the <code class="language-text">rating</code> definition or one of its components.</dd>
  </dl>
- `maturity`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:nonNegativeInteger</code></dd>
    <dt>Values:</dt>
    <dd>Range: 0–1 inclusive</dd>
    <dt>Purpose:</dt>
    <dd>Sets the relative maturity level of a <code class="language-text">rating</code> definition.</dd>
  </dl>
- `color`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd>Any valid <a href="https://www.w3.org/TR/2018/REC-css-color-3-20180619/">CSS color</a> value</dd>
    <dt>Purpose:</dt>
    <dd>Sets the canonical color representation for the rating level, typically indicating “severity” by way of color warmth. Does not guarantee faithful rendering by a User-agent, which may decide on other design treatments such as monochrome or high-contrast.</dd>
  </dl>
<!-- </details> -->

#### Definition

A content rating with which an Author can classify a piece of content.

<!-- `rating` elements can provide more semantic context to other `rating` elements.



 can link to `rating` elements under a `glossary` to avoid specifying broadly-used semantics multiple times.

For instance, given an HVML document describing 100 “PG”-rated Hollywood movies: without linking, “PG” would have to be defined in terms of `rating` 100 times. With linking, it only has to be defined once. -->

#### Authoring

The `type` attribute accepts one or more values as a space-separated list. When it contains a list, any or all of the values may apply to the definition, depending on the rules of the rating system.

If the `type` attribute is not present, or is present but [empty](/glossary#empty-string), any or all of the `<rating>`’s possible types, excluding `custom`, may apply.

If a `rating` element has another `<rating>` as its parent, and the parent has a `type` attribute, then the child’s `type` attribute is inherited from the parent and is optional. Otherwise, it is required.

If both the parent and the child `<rating>`s have `type`s that don’t match, then the child `<rating>`’s `type` takes precedence.

The `maturity` attribute defines the rating level relative to other `rating`s on a scale from 0 to 1 inclusive, 0 meaning “little to no maturity required” to safely consume a piece of content (however that is defined by the rating system); 1 meaning “a lot of maturity required”.

If `maturity` is omitted and there is more than one `<rating>` for a given `<glossary>`, then `maturity` is calculated automatically as an even distribution according to the top-down source order starting at 0. So, for a set of five `<rating>`s without `maturity`s set, their `maturitys` would be calculated by a User-agent as 0, 0.25, 0.5, 0.75, and 1 respectively. This is referred to as <dfn>pre-ordering</dfn> on behalf of the Author.

If `maturity` is omitted on the only `<rating>` for a given `<glossary>`, then the `<rating>` represents a <b>binary rating rating</b> and its maturity is equal to 1.

#### Examples

1. Defining the content rating for a video.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <video type="feature" xml:id="drive-2011">
       <title>Drive</title>
       <published>2011-05-20</published>
       <rating code="R" />
     </video>
   </hvml>
   ```
   On its own, all this says is that someone has used the letter “R” to indicate the recommended maturity level for the video’s audience. While most <abbr>US</abbr> moviegoers might understand this to be an abbreviation for “Restricted” as assigned by the <abbr>MPAA</abbr>, its meaning and origin may not be clear to non-<abbr>US</abbr> audiences or robots.

2. In order to provide better context, the previous example can be expanded to:
   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <video type="feature" xml:id="drive-2011">
       <title>Drive</title>
       <published>2011-05-20</published>
       <rating code="R" maturity="0.75">
         <entity>
           <name>Motion Picture Association of America</name>
           <nickname>MPAA</nickname>
           <site title="MPAA.org">https://www.mpaa.org</site>
         </entity>
         <title>Restricted</title>
         <subtitle>Children Under 17 Require Accompanying Parent or Adult Guardian</subtitle>
         <description>An R-rated motion picture, in the view of the Rating Board, contains some adult material. An R-rated motion picture may include adult themes, adult activity, hard language, intense or persistent violence, sexually-oriented nudity, drug abuse or other elements, so that parents are counseled to take this rating very seriously. Children under 17 are not allowed to attend R-rated motion pictures unaccompanied by a parent or adult guardian. Parents are strongly urged to find out more about R-rated motion pictures in determining their suitability for their children. Generally, it is not appropriate for parents to bring their young children with them to R-rated motion pictures.</description>
         <reason type="violence profanity nudity">strong brutal bloody violence, language and some nudity</reason>
       </rating>
     </video>
   </hvml>
   ```
   However, this would be a lot to include in a document or database describing multiple “R”-rated movies, so it is usually more economical to outsource most of the definition to a `glossary`, and link to that from the `video`’s local `rating`.

3. By linking via `code`, the applied `rating` references all of the glossary `rating`’s data, as if it were contained inline.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <meta>
       <glossary xml:id="mpaa" for="rating" party="3rd">
         <title>MPAA Ratings</title>
         <scheme>https://filmratings.com/Content/Downloads/rating_rules.pdf</scheme>
         <rating xml:id="mpaa-g" code="G" maturity="0">
           <title>General Audiences</title>
           <subtitle>General Audiences</subtitle>
         </rating>
         <!-- … -->
         <rating xml:id="mpaa-r" code="R" maturity="0.75">
           <title>Restricted</title>
           <subtitle>Children Under 17 Require Accompanying Parent or Adult Guardian</subtitle>
         </rating>
       </glossary>
     </meta>
     <video type="feature" xml:id="drive-2011">
       <title>Drive</title>
       <published>2011-05-20</published>
       <rating code="R">
         <reason type="violence profanity nudity">strong brutal bloody violence, language and some nudity</reason>
       </rating>
     </video>
   </hvml>
   ```

4. To disambiguate between clashing codes, the applied `rating` uses <b>glossary scoping</b>.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <meta>
       <glossary xml:id="mpaa" for="rating" party="3rd">
         <title>MPAA Ratings</title>
         <scheme>https://filmratings.com/Content/Downloads/rating_rules.pdf</scheme>
         <rating xml:id="mpaa-r" code="R" maturity="0.75">
           <title>Restricted</title>
           <subtitle>Children Under 17 Require Accompanying Parent or Adult Guardian</subtitle>
         </rating>
       </glossary>
       <glossary xml:id="joe-cool" for="rating" party="3rd">
         <title>Joe Cool’s Ratings</title>
         <scheme>http://peanuts.wikia.com/wiki/Joe_Cool</scheme>
         <rating xml:id="joe-cool-r" code="R" maturity="0">
           <title>Really Cool</title>
           <subtitle>Children Under 17 Don’t Require Jack, Man.</subtitle>
         </rating>
       </glossary>
     </meta>
     <video type="feature" xml:id="drive-2011">
       <title>Drive</title>
       <published>2011-05-20</published>
       <rating glossary="#mpaa" code="R">
         <reason type="violence profanity nudity">strong brutal bloody violence, language and some nudity</reason>
       </rating>
     </video>
   </hvml>
   ```

5. Alternatively, `rating`s can link to glossary definitions by ID. This requires importing the `xlink` namespace on the root node.

   ```xml
   <hvml
     xmlns="https://hypervideo.tech/hvml#"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xml:lang="en"
   >
     <meta>
       <glossary xml:id="mpaa" for="rating" party="3rd">
         <title>MPAA Ratings</title>
         <scheme>https://filmratings.com/Content/Downloads/rating_rules.pdf</scheme>
         <rating xml:id="mpaa-g" code="G" maturity="0">
           <title>General Audiences</title>
           <subtitle>General Audiences</subtitle>
         </rating>
         <!-- … -->
         <rating xml:id="mpaa-r" code="R" maturity="0.75">
           <title>Restricted</title>
           <subtitle>Children Under 17 Require Accompanying Parent or Adult Guardian</subtitle>
         </rating>
       </glossary>
     </meta>
     <video type="feature" xml:id="drive-2011">
       <title>Drive</title>
       <published>2011-05-20</published>
       <rating xlink:href="#mpaa-r">
         <reason type="violence profanity nudity">strong brutal bloody violence, language and some nudity</reason>
       </rating>
     </video>
   </hvml>
   ```

6. Defining a glossary of three `profanity` content ratings, on a scale from least profane to most profane.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="yt" for="ratings">
       <title>YouTube Content Rating</title>
       <scheme>https://support.google.com/youtube/answer/146399?hl=en</scheme>
       <rating type="profanity">
         <rating code="L-" color="green">
           <title>None</title>
         </rating>
         <rating code="L" color="yellow">
          <title>Strong language</title>
        </rating>
         <rating code="L+" color="red">
           <title>Explicit language</title>
         </rating>
       </rating>
     </glossary>
   </hvml>
   ```

7. Defining a glossary of three `profanity` content ratings, on a scale from least profane to most profane, with explicit maturity ranking.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="yt" for="ratings">
       <title>YouTube Content Rating</title>
       <scheme>https://support.google.com/youtube/answer/146399?hl=en</scheme>
       <rating type="profanity">
         <rating code="L-" maturity="0" color="green">
           <title>None</title>
         </rating>
         <rating code="L" maturity="0.5" color="yellow">
          <title>Strong language</title>
        </rating>
         <rating code="L+" maturity="1" color="red">
           <title>Explicit language</title>
         </rating>
       </rating>
     </glossary>
   </hvml>
   ```

8. Defining a binary content rating, with an implied maturity of `1`.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <glossary xml:id="pal" for="ratings">
       <title>Parental Advisory Label</title>
       <scheme>https://www.riaa.com/resources-learning/pal-standards/</scheme>
       <rating type="profanity sex violence drugs" code="PAL">
         <title>Parental Advisory Label</title>
       </rating>
     </glossary>
   </hvml>
   ```

#### Parsing

If the `type` attribute is present and set to an unrecognized, [non-empty string](/glossary#non-empty-string), interpret the `type` as being set to the exact string `custom`, to gracefully degrade in the event of future permissible values.

If the `type` attribute is present and set to the exact string `custom`, then the `<rating>` has nonstandard semantics which the User-agent [MAY](https://tools.ietf.org/html/rfc2119#section-5) infer from heuristics.
