(()=>{"use strict";function e(e,n){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,n)}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0,c=function(){};return{s:c,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,a=!0,i=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){i=!0,l=e},f:function(){try{a||null==r.return||r.return()}finally{if(i)throw l}}}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var n=!0,r=document.querySelectorAll('input[type="checkbox"]'),o=document.querySelector(".selectBox"),c=document.getElementById("checkBoxes"),l=new Event("closebox");o.addEventListener("click",(function(){n?(c.style.display="block",c.style.zIndex="100",n=!1):(c.style.display="none",n=!0,c.dispatchEvent(l))})),window.addEventListener("load",(function(){var t,n=e(r);try{for(n.s();!(t=n.n()).done;){t.value.checked=!0}}catch(e){n.e(e)}finally{n.f()}}));var a=Array.prototype.slice.call(r),i=a.shift();i.addEventListener("click",(function(){if(i.checked){var t,n=e(r);try{for(n.s();!(t=n.n()).done;){t.value.checked=!0}}catch(e){n.e(e)}finally{n.f()}}else{var o,c=e(r);try{for(c.s();!(o=c.n()).done;){o.value.checked=!1}}catch(e){c.e(e)}finally{c.f()}}}));var f,u=e(a);try{for(u.s();!(f=u.n()).done;){f.value.addEventListener("click",(function(){var t,n=0,r=e(a);try{for(r.s();!(t=r.n()).done;){t.value.checked&&(n+=1)}}catch(e){r.e(e)}finally{r.f()}console.log(a.length),a.length===n&&!1===i.checked&&(i.checked=!0),a.length!==n&&i.checked&&(i.checked=!1)}))}}catch(e){u.e(e)}finally{u.f()}})();