// animate.js
/*
 * v1.0.0
 * @author William Lin
 * @license The MIT License (MIT)
 * https://github.com/ganlanyuan/animate
 */
var animate = ( function () {
  return function (el, attr, from, to, duration){
    function toCamelCase(str) {
      return str.replace(/-([a-z])/ig, function( all, letter ) {
        return letter.toUpperCase();
      });
    }

    if (duration < 0) {return;}
    if (typeof attr === "string") {
      var difference = to - from,
          perTick = difference / duration * 10;

      setTimeout(function () {
        from += perTick;
        el.style[toCamelCase(attr)] = from + 'px';
        if (from === to) { return; }
        animate(el, attr, from, to, duration - 10);
      }, 10);
    } else { throw { message: "Invalid parameters passed to css()" }; }
  };
})();