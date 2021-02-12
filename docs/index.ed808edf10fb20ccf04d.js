(()=>{"use strict";let e;const t=document.querySelectorAll("td");window.onload=function(){let n=indexedDB.open("calendar",1);function o(t){let n=Number(t.currentTarget.parentNode.getAttribute("id").match(/\d+/)),o=e.transaction(["events"],"readwrite");o.objectStore("events").delete(n);o.oncomplete=function(){t.target.parentNode.parentNode.setAttribute("data-allowdrop","true"),t.target.parentNode.remove()},console.log("Delete!")}n.onupgradeneeded=function(){e=n.result;let t=e.createObjectStore("events",{keyPath:"id",autoIncrement:!0});t.createIndex("name","name",{unique:!1}),t.createIndex("participants","participants",{unique:!1}),t.createIndex("dayTime","dayTime",{unique:!0}),console.log("Database setup complete")},n.onerror=function(){console.error("Error",n.error)},n.onsuccess=function(){console.log("Database opened succesfully"),e=n.result,e.transaction("events").objectStore("events").openCursor().onsuccess=function(e){let t=e.target.result;if(t){const e=t.value.dayTime;console.log(e);const n=`td[headers="${e}"]`;console.log(n);const a=document.querySelector(n);console.log(a),a.setAttribute("data-allowdrop","false");const r=document.createElement("div"),s=document.createElement("span"),d=document.createElement("span");r.setAttribute("id",`event-${t.value.id}`),r.setAttribute("draggable","true"),d.innerHTML="&times;",s.textContent=t.value.name,a.appendChild(r),r.appendChild(s),r.appendChild(d),r.classList.add("td-content"),d.classList.add("td__delete-btn"),d.onclick=o,t.continue()}else console.log("Notes all displayed")};for(let e of t)e.setAttribute("data-allowdrop","true"),e.addEventListener("dragover",a),e.ondragstart=r,e.addEventListener("drop",s);function a(e){e.preventDefault()}function r(e){e.dataTransfer.setData("headers",e.currentTarget.getAttribute("headers"))}function s(t){let n=t.dataTransfer.getData("headers");t.target.appendChild(document.querySelector(`td[headers="${n}"]`).firstChild);let o=e.transaction(["events"],"readwrite"),a=o.objectStore("events"),r=a.index("dayTime").get(n);r.onsuccess=()=>{const e=r.result;e.dayTime=t.target.getAttribute("headers");a.put(e).onsuccess=()=>{console.log("DayTime is update!")}},o.oncomplete=function(){console.log("Complete!")}}}}})();