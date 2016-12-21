var animate=function(){return function(t,e,n,a,r){function i(t){return t.replace(/-([a-z])/gi,function(t,e){return e.toUpperCase()})}if(!(r<0)){if("string"!=typeof e)throw{message:"Invalid parameters passed to css()"};var s=a-n,o=s/r*10;setTimeout(function(){n+=o,t.style[i(e)]=n+"px",n!==a&&animate(t,e,n,a,r-10)},10)}}}();
//# sourceMappingURL=../sourcemaps/animate.js.map
