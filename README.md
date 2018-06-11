**moon-phase** will phase colors according to the lunar cycle.

It can also draw a moon clock:

```javascript
var moon = require("moon-phase")

var highlight = moon.highlight(moonJump)
var background = moon.background(moonJump)

var theme = element.stylesheet([
  element.style(
    "sym",{
    "background": highlight+" !important"}),
  element.style(
    "empty, sym.logo",{
    "background": "none !important",
    "border-color": highlight+" !important"}),
  element.style(
    "body",{
    "background": background+" !important"}),
])

var clock = bridge.partial()

moon.renderClock(
  clock,
  moonJump)
    
```