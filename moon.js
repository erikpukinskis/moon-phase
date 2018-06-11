var library = require("module-library")(require)

module.exports = library.export(
  "moon",
  ["web-element"],
  function(element) {

    var MOON_ORBIT_IN_DAYS = 27.32158

    // Moon colors

    var DAY_BACKGROUND = [255,210,255]
    var NIGHT_BACKGROUND = [230,230,245]
    var DAY_HIGLIGHT = [255,240,240]
    var NIGHT_HIGHLIGHT = [250,250,255]

    function rgbBetween(color1, color2, distance) {

      function component(x) {
        var pointsDifferent = color2[x] - color1[x]
        var offset = pointsDifferent * distance
        return color1[x] + offset
      }

      return "rgb("+component(0)+","+component(1)+","+component(2)+")"
    }


    function bounce(percent) {
      var base = percent * 2

      if (base > 1) {
        var overage = base - 1.0
        var distance = 1 - overage
      } else {
        var distance = base
      }

      return distance
    }

    function highlight(moonJump) {
      var percent = percentToNewMoon(
        moonJump)
      var fromCenter = bounce(percent)
      return rgbBetween(
        DAY_HIGLIGHT,
        NIGHT_HIGHLIGHT,
        fromCenter)
    }

    function background(moonJump) {
      return rgbBetween(
        DAY_BACKGROUND,
        NIGHT_BACKGROUND,
        bounce(
          percentToNewMoon(
            moonJump)))
    }

    function percentToNewMoon (moonJump) {
      var cycles = Math.floor(moonJump / MOON_ORBIT_IN_DAYS)
      moonJump = moonJump - cycles * MOON_ORBIT_IN_DAYS

      var seconds = 1000
      var minutes = 60 * seconds
      var hours = 60 * minutes
      var oneDay = 24 * hours
      var daysSinceEpoch = Date.now() / oneDay
      var daysSinceFirstMoon = daysSinceEpoch + MOON_ORBIT_IN_DAYS  + moonJump||0
      var orbitsSinceEpoch = Math.floor(daysSinceFirstMoon / MOON_ORBIT_IN_DAYS)
      var daysSinceNewMoon = daysSinceFirstMoon - orbitsSinceEpoch * MOON_ORBIT_IN_DAYS
      var percent = daysSinceNewMoon / MOON_ORBIT_IN_DAYS

      return percent
    }

    var planets = {
      pisces: "♆",
      aquarius: "⛢",
      capricorn: "♄",
      saggitarius: "♃",
      scorpio: "♇",
      libra: "♀",
      virgo: "⊕",
      leo: "☉",
      cancer: "☽",
      gemini: "☿",
      taurus: "♀",
      aries: "♂",
    }

    var signs = Object.keys(planets)

    var sign = element.template(
      ".sign",
      element.style({
        "font-size": "3em",
        "display": "inline-block",
        "width": "0",
        "overflow": "visible",
        "text-align": "center",
        "color": "#9b9bd9",
        "position": "absolute",
        "left": "0",
        "transform-origin": "0 150px",
        }),
      function(name, moonJump) {
        this.addChild(planets[name])

        var signAdds = signs.indexOf(name) / 12 * MOON_ORBIT_IN_DAYS

        var offset = percentToNewMoon(moonJump + signAdds) * 12

        var strength = bounce(offset)

        var degrees = 360 - offset * 30 - 16

        if (degrees < 180) {
          var strength = 1 - degrees / 90
        } else {
          var strength = 1 - (360 - degrees) / 90
        }
        this.appendStyles({
          "transform": "rotate("+degrees+"deg)",
          "opacity": strength,
        })
      }
    )

    function renderClock(bridge, moonJump) {
      if (!bridge.remember("moon")) {
        bridge.addToHead(element.stylesheet(sign))
        bridge.see("moon", true)
      }

      bridge.send(
        element(
          element.style({
            "white-space": "nowrap",
            "position": "fixed",
            "bottom": "100px",
            "right": "100px",
            "opacity": "0.5",
          }),
          signs.map(function(name) {
            return sign(
              name,
              moonJump)})
        )
      )
    }

    return {
      percentToNewMoon: percentToNewMoon,
      renderClock: renderClock,
      highlight: highlight,
      background: background,
    }
  }
)
      