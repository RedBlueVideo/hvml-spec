OVML – Open Video Markup Language
====

OVML is an XML-based markup language for codifying information pertaining to audio-visual media such as films, television, home movies, or any other moving image, digital or analog. Its primary intent, in its current iteration, is to provide a standardized syntax and interface for storing and querying video metadata. The type of data is similar to that found on [IMDb](http://www.imdb.com/), [TMDb](http://www.themoviedb.org/), [Wikipedia](http://www.wikipedia.org/), and [Amazon](http://www.amazon.com/); its aim comparable to [MPEG-7](http://mpeg.chiariglione.org/standards/mpeg-7), but more limited in scope (to be easier for humans to understand and author), and being completely unencumbered by patents.

Possible uses:

- Video players displaying metadata to an end user, as with [ID3](http://id3.org/) tags.
- Search engines displaying metadata to an end user, as with [schema.org](http://schema.org/VideoObject) (but with a more robust, specialized vocabulary).
- Historians wishing to catalog the world’s films.
- Archivists wishing to catalog internal libraries (such as the [HFA](http://hcl.harvard.edu/hfa/)).
- Video content authors wishing to store robust information about their films.
- Content publishers wishing to store/query/display robust information about video media being displayed and/or discussed.
- Educators and students wishing to teach or understand the minute details of films and video.
- Programmers wishing to ingest, convert, display, or splice video files who must reference technical details like frame rate or pixel aspect ratio without relying on the often erroneous or incomplete information reported by the container.

Inspired by the popular article “[How The Television Will Be Revolutionized: The Exciting Future of the iPad, Internet TV, and Web 3.0](http://www.accelerating.org/articles/televisionwillberevolutionized.html)”, which talks about an “OVML”, its goals do not yet overlap 100% with the ones the author intended for its namesake.

## Cheat Sheet

- Content-Type: `application/ovml+xml`
- Extensions: `.ovml`, `.xml`
- Namespace: `http://vocab.nospoon.tv/ovml#`
- Standard namespace prefix: `ovml`
