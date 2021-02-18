(()=>{"use strict";let e;const t=document.getElementById("checkBoxes"),n=document.querySelectorAll("td"),r=My$.modal({content:'\n  <p>Are You sure You want to delete "Retrospective" event?</p>\n'});window.addEventListener("load",(()=>{const o=indexedDB.open("calendar",1);function a(t){const{currentTarget:n}=t,{target:o}=t;r.open();const a=document.querySelector("#yes"),c=document.querySelector("#no");a.addEventListener("click",(()=>{const t=Number(n.parentNode.getAttribute("id").match(/\d+/)),a=e.transaction(["events"],"readwrite");a.objectStore("events").delete(t),a.oncomplete=()=>{o.parentNode.remove()},r.close()})),c.addEventListener("click",(()=>{r.close()}))}function c(t){const n=[];document.querySelectorAll('input[type="checkbox"]:checked').forEach((e=>{const t=document.querySelector(`label[for="${e.id}"`);n.push(t.textContent.trim())}));e.transaction("events").objectStore("events").openCursor().onsuccess=e=>{const r=e.target.result;if(r){const{participants:e}=r.value;if("all"===t||My$.arrCompare(e,n)){const e=`td[headers="${r.value.dayTime}"]`,t=document.querySelector(e),n=document.createElement("div"),o=document.createElement("span"),c=document.createElement("span");n.setAttribute("id",`event-${r.value.id}`),n.setAttribute("draggable","true"),c.innerHTML="&times;",o.textContent=r.value.name,t.appendChild(n),n.appendChild(o),n.appendChild(c),n.classList.add("td-content"),c.classList.add("td__delete-btn"),c.onclick=a}r.continue()}}}o.onupgradeneeded=()=>{e=o.result;const t=e.createObjectStore("events",{keyPath:"id",autoIncrement:!0});t.createIndex("name","name",{unique:!1}),t.createIndex("participants","participants",{unique:!1}),t.createIndex("dayTime","dayTime",{unique:!0}),console.log("Database setup complete")},o.onerror=()=>{console.error("Error",o.error)},o.onsuccess=()=>{function r(e){e.preventDefault()}function a(e){e.dataTransfer.setData("headers",e.currentTarget.getAttribute("headers"))}function s(t){const n=t.dataTransfer.getData("headers");t.target.appendChild(document.querySelector(`td[headers="${n}"]`).firstChild);const r=e.transaction(["events"],"readwrite"),o=r.objectStore("events"),a=o.index("dayTime").get(n);a.onsuccess=()=>{const e=a.result;e.dayTime=t.target.getAttribute("headers");o.put(e).onsuccess=()=>{console.log("DayTime is update!")}},r.oncomplete=()=>{console.log("Complete!")}}console.log("Database opened succesfully"),e=o.result,c("all"),t.addEventListener("closebox",(()=>{n.forEach((e=>{e.firstChild&&e.firstChild.remove()})),c()}),!1),n.forEach((e=>{e.addEventListener("dragover",r),e.addEventListener("dragstart",a),e.addEventListener("drop",s)}))}}))})();