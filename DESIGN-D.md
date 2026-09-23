# Design D — The classroom

D clones C into independent HTML, CSS and JavaScript. C’s three source files remain untouched as the archived reference. Shared media stays in its existing asset locations.

The opening introduces twelve available finished video previews from the 45-timer project. No unavailable videos are invented. Each coloured room has a screen, room number and small desk marks; dotted corridors connect the staggered rooms. Cobalt, yellow, vermilion, green and violet draw on the supplied poster references. The process chapters below the hero remain inherited from C.

Videos play directly inside their room frames as each room enters view and pause when it leaves. Clicking a room pauses or resumes its preview. Posters stay visible until a video is ready. Auto previews stop in hidden tabs, with reduced motion, or when data saving is active; an explicit click can still play a room. Only nearby room videos download, with two concurrent requests at most and smaller source files on mobile where available. D's process clips use a shorter look-ahead window so they do not compete with the classroom during page load. Local `file://` views attach videos directly because browsers block `fetch()` from null-origin file pages.

All twelve desktop videos, mobile sources and posters are present as actual files.
