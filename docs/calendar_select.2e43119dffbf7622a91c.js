(()=>{"use strict";let e=!0;document.querySelector(".selectBox").addEventListener("click",(function(){e?(t.style.display="block",t.style.zIndex="100",e=!1):(t.style.display="none",e=!0,t.dispatchEvent(c))}));let t=document.getElementById("checkBoxes");const c=new Event("closebox");window.addEventListener("load",(()=>{const e=document.querySelectorAll('input[type="checkbox"]');for(let t of e)t.checked=!0}))})();