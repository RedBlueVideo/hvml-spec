HVML – Hypervideo Markup Language
====
(Formerly known as “OVML” for Open Video Markup Language)

HVML is an RDFa-compatible, XML-based markup language for codifying information pertaining to audio-visual media such as films, television, home movies, or any other moving image, digital or analog.

Its primary goal is to provide a standardized syntax and interface for storing and querying video metadata. The type of data it encodes is comparable to those found on [IMDb](http://www.imdb.com/), [TMDb](http://www.themoviedb.org/), [Wikipedia](http://www.wikipedia.org/), and [Amazon](http://www.amazon.com/), however it is not meant to replace these services; in theory they could all implement HVML.

It is a similar technology to [MPEG-7](http://en.wikipedia.org/wiki/MPEG-7), but more limited in scope (to make it easier for humans to understand and author), with the goal of being [free](https://github.com/RedBlueVideo/hvml-spec/blob/master/LICENSE.txt "GNU General Public License v3.0") of [patent encumbrance](http://www.internetnews.com/infra/article.php/2196421/Licensing+Firm+Preps+for+MPEG7+Standard.htm "“Licensing Firm Preps for MPEG-7 Standard” on internetnews.com").

Inspired by the article [“How The Television Will Be Revolutionized: The Exciting Future of the iPad, Internet TV, and Web 3.0”](http://www.accelerating.org/articles/televisionwillberevolutionized.html), which talks about an “OVML”, its uses cases do not coincide 100% with the ones the author mentions.

## Use Cases

- Video players displaying metadata to an end user, as with MP3 [ID3](http://id3.org/) tags.
- Search engines displaying metadata to an end user, as with [schema.org](http://schema.org/VideoObject) (but with a more specialized vocabulary).
- Historians wishing to catalog the world’s films.
- Archivists wishing to catalog internal libraries (such as the [HFA](http://hcl.harvard.edu/hfa/)).
- Video content authors wishing to store information about their films.
- Content publishers wishing to store/query/display information about video media being delivered and/or discussed.
- Educators and students wishing to teach or understand the minute details of films and video.
- Programmers wishing to ingest, convert, display, or splice video files who must reference technical details like frame rate or pixel aspect ratio without relying on the often erroneous or incomplete information reported by the container.

## Cheat Sheet

- <b>Content-Type</b>:
  - Working: `application/prs.hvml+xml`
  - Proposed: `application/hvml+xml` (pending <abbr>IETF</abbr> standardization)
  - Deprecated: `application/ovml+xml`
- <b>Extensions</b>:
  - Standard: `.hvml`
  - Alternative: `.xml`
  - Deprecated: `.ovml`
- <b>Namespace</b>:
  - Standard: `https://hypervideo.tech/hvml#`
  - Deprecated: `http://vocab.nospoon.tv/ovml#`
- <b>Namespace prefix</b>:
  - Standard: `hvml`
  - Deprecated: `ovml`

## Specification

See [hypervideo.tech](https://hypervideo.tech) (work-in-progress).
