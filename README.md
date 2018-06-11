**moon-phase** will phase colors according to the lunar cycle.

It can also draw a moon clock:

```javascript
var moon = require("moon-phase")

var moonJump = 0

var highlight = moon.highlight(moonJump)
var background = moon.background(moonJump)

var theme = webElement.stylesheet([
  webElement.style(
    ".theme-highlight",{
    "background": highlight+" !important"}),
  webElement.style(
    ".theme-border-highlight",{
    "background": "none !important",
    "border-color": highlight+" !important"}),
  webElement.style(
    ".themed-body-color",{
    "background": background+" !important"}),
])

var clock = browserBridge.partial()

moon.renderClock(
  clock,
  moonJump)
    
```