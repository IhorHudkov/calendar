(()=>{"use strict";class e{constructor(e){this._name=e,this._role="user"}get name(){return this._name}get role(){return this._role}}class t extends e{constructor(e){super(e),this._role="admin"}}const n=["Jhon","Mila","Sam","Molly","Garry","Lisa","Mike"],a=[];for(let o=0;o<n.length;o+=1)o<3?a.push(new t(n[o])):a.push(new e(n[o]));const o=a,r=My$.modal({content:`\n    <p>Please, authorise</p>\n    <p id="role"></p>\n    <select class="form-select form-select-lg mb-3" id="auth-select">\n        <option selected>Select a name</option>\n        ${(()=>{let e="";for(const t of o)e+=`<option value="${t.name}">${t.name}</option>\n\t`;return e})()}\n    </select>\n    <div class="modal-buttons">\n        <button type="button" class="btn btn-primary" id="confirm">Confirm</button>\n    </div>\n  `});class s{constructor(e){this._event=e}_postOptions(){return{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:`{"data": "${JSON.stringify(this._event).replace(/"/g,'\\"')}"}`}}static async getAllEvents(){const e=await fetch("http://158.101.166.74:8080/api/data/ihor_hudkov/events");return await e.json()}static async getEventByDayTime(e){return s.getAllEvents().then((t=>{let n;for(const a of t)if(JSON.parse(a.data).dayTime===e){n=a;break}return n}))}async createEvent(){const e=await s.getAllEvents();if(e)for(const t of e)if(JSON.parse(t.data).dayTime===this._event.dayTime)throw new Error("Failed to create an event. Time slot is already booked.");const t=await fetch("http://158.101.166.74:8080/api/data/ihor_hudkov/events",this._postOptions());return await t.json()}static async deleteEvent(e){return(await fetch(`http://158.101.166.74:8080/api/data/ihor_hudkov/events/${e}`,{method:"DELETE"})).ok}static async updateEvent(e,t){return(await fetch(`http://158.101.166.74:8080/api/data/ihor_hudkov/events/${e}`,{method:"PUT",headers:{"Content-Type":"application/json;charset=utf-8"},body:`{"data": "${JSON.stringify(t).replace(/"/g,'\\"')}"}`})).ok}}const c=document.getElementById("checkBoxes"),d=document.querySelectorAll("td"),i=My$.modal({content:'\n    <p>Are You sure You want to delete "Retrospective" event?</p>\n    <div class="modal-buttons">\n      <button type="button" class="btn btn-danger" id="yes">Yes</button>\n      <button type="button" class="btn btn-outline-dark" id="no">No!</button>\n    </div>\n  '});window.addEventListener("load",(()=>{function e(e){const{currentTarget:t}=e,{target:n}=e;i.open();const a=document.querySelector("#yes"),o=document.querySelector("#no");a.addEventListener("click",(()=>{const e=t.parentNode.getAttribute("id");s.deleteEvent(e).then((e=>{e?(n.parentNode.remove(),i.close(),alert("Event successfully deleted!")):(i.close(),alert("Something went wrong!"))}),(e=>{i.close(),alert(e.message)}))})),o.addEventListener("click",(()=>{i.close()}))}function t(t){const n=[];document.querySelectorAll('input[type="checkbox"]:checked').forEach((e=>{const t=document.querySelector(`label[for="${e.id}"`);n.push(t.textContent.trim())})),s.getAllEvents().then((a=>{a&&a.forEach((a=>{const{participants:o}=a;if("all"===t||My$.arrCompare(o,n)){const t=`td[headers="${JSON.parse(a.data).dayTime}"]`,n=document.querySelector(t),o=document.createElement("div"),r=document.createElement("span"),s=document.createElement("span");o.setAttribute("id",a.id),o.setAttribute("draggable","true"),s.innerHTML="&times;",r.textContent=JSON.parse(a.data).name,n.appendChild(o),o.appendChild(r),o.appendChild(s),o.classList.add("td-content"),s.classList.add("td__delete-btn"),s.addEventListener("click",e)}}))}))}function n(e){e.preventDefault()}function a(e){e.dataTransfer.setData("headers",e.currentTarget.getAttribute("headers"))}function l(e){const t=e.dataTransfer.getData("headers");e.target.appendChild(document.querySelector(`td[headers="${t}"]`).firstChild),s.getEventByDayTime(t).then((t=>{const n=e.target.getAttribute("headers");return{desiredEvent:t,newData:{name:JSON.parse(t.data).name,participants:JSON.parse(t.data).participants,dayTime:n}}})).then((e=>{s.updateEvent(e.desiredEvent.id,e.newData).then((e=>{e?alert("Successfully updated!"):alert("Something went wrong :(")}),(t=>{console.log(e.desiredEvent.id),console.log(e.newData),alert(`${t.message}`)}))}))}t("all"),c.addEventListener("closebox",(()=>{d.forEach((e=>{e.firstChild&&e.firstChild.remove()})),t()}),!1),d.forEach((e=>{e.addEventListener("dragover",n),e.addEventListener("dragstart",a),e.addEventListener("drop",l)})),r.open();const u=document.querySelector("#auth-select"),p=()=>{const e=document.querySelector("#auth-select>option:checked").value;let t;return"Select a name"!==e&&(t=o.find((t=>t.name===e&&t))),t};u.onchange=()=>{document.getElementById("role").innerText=`Role: ${p()?p().role:""}`};document.querySelector("#confirm").onclick=()=>{let e;if(p()&&(e=p().role,r.close()),"user"===e){document.querySelector("#new-event-btn").style.display="none",document.querySelector(".select-names").style.marginRight=0,d.forEach((e=>{e.removeEventListener("dragover",n),e.removeEventListener("dragstart",a),e.removeEventListener("drop",l)}));const e=document.querySelectorAll(".td__delete-btn");console.log(e);for(const t of e)t.style.display="none"}}}))})();