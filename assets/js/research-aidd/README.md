These production drawing sources are adapted from the approved illustrations in
`images/research-direction/`. The originals are preserved.

Rebuild the single browser script with `node assets/js/research-aidd/build.cjs`.
Load `assets/js/research-aidd.js` with `defer`. It renders canvases marked with
`data-research-scene="design"`, `"worldModel"`, or `"agent"` at native screen
pixel density, with a maximum device pixel ratio of 3. The expected aspect ratios
are 840/200, 840/220, and 840/270 respectively.

The controller pauses drawings outside the viewport and inside an inactive research
panel. Reduced-motion mode displays a representative static frame. It adds no
playback controls or public controller API; the existing `ResearchScenes` drawing
namespace is retained.
