(()=>{"use strict";let e,t=document.getElementById("checkBoxes");const n=document.querySelectorAll("td");window.addEventListener("load",(()=>{let o=indexedDB.open("calendar",1);function r(t){const n=[],o=document.querySelectorAll('input[type="checkbox"]:checked');for(let e of o){let t=document.querySelector(`label[for="${e.id}"`);n.push(t.textContent.trim())}console.log(n),e.transaction("events").objectStore("events").openCursor().onsuccess=function(e){let o=e.target.result;if(o){const e=o.value.participants;if("all"===t||My$.arrCompare(e,n)){const e=o.value.dayTime;console.log(e);const t=`td[headers="${e}"]`;console.log(t);const n=document.querySelector(t);console.log(n),n.setAttribute("data-allowdrop","false");const r=document.createElement("div"),c=document.createElement("span"),s=document.createElement("span");r.setAttribute("id",`event-${o.value.id}`),r.setAttribute("draggable","true"),s.innerHTML="&times;",c.textContent=o.value.name,n.appendChild(r),r.appendChild(c),r.appendChild(s),r.classList.add("td-content"),s.classList.add("td__delete-btn"),s.onclick=a}o.continue()}else console.log("Notes all displayed")}}function a(t){const n=t.currentTarget,o=t.target,r=My$.modal({content:'\n\t\t\t<p>Are You sure You want to delete "Retrospective" event?</p>\n\t\t'});r.open();const a=document.querySelector("#yes"),c=document.querySelector("#no");a.addEventListener("click",(()=>{let t=Number(n.parentNode.getAttribute("id").match(/\d+/)),a=e.transaction(["events"],"readwrite");a.objectStore("events").delete(t);a.oncomplete=function(){o.parentNode.parentNode.setAttribute("data-allowdrop","true"),o.parentNode.remove()},console.log("Delete!"),r.close(),r.destroy()})),c.addEventListener("click",(()=>{r.close(),r.destroy()}))}o.onupgradeneeded=function(){e=o.result;let t=e.createObjectStore("events",{keyPath:"id",autoIncrement:!0});t.createIndex("name","name",{unique:!1}),t.createIndex("participants","participants",{unique:!1}),t.createIndex("dayTime","dayTime",{unique:!0}),console.log("Database setup complete")},o.onerror=function(){console.error("Error",o.error)},o.onsuccess=function(){console.log("Database opened succesfully"),e=o.result,r("all"),t.addEventListener("closebox",(()=>{!function(){for(let e of n)e.firstChild&&e.firstChild.remove()}(),r()}),!1);for(let e of n)e.setAttribute("data-allowdrop","true"),e.addEventListener("dragover",a),e.ondragstart=c,e.addEventListener("drop",s);function a(e){e.preventDefault()}function c(e){e.dataTransfer.setData("headers",e.currentTarget.getAttribute("headers"))}function s(t){let n=t.dataTransfer.getData("headers");t.target.appendChild(document.querySelector(`td[headers="${n}"]`).firstChild);let o=e.transaction(["events"],"readwrite"),r=o.objectStore("events"),a=r.index("dayTime").get(n);a.onsuccess=()=>{const e=a.result;e.dayTime=t.target.getAttribute("headers");r.put(e).onsuccess=()=>{console.log("DayTime is update!")}},o.oncomplete=function(){console.log("Complete!")}}}}))})();