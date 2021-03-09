(()=>{"use strict";class e{constructor(){if(e.exists)return e.instance;e.instance=this,e.exists=!0,this.url="http://158.101.166.74:8080/api/data/ihor_hudkov/"}async getAll(e){const t=await fetch(`${this.url}${e}`);return await t.json()}async create(e,t){const a=await this.getAll(e);if(a){if("events"===e)for(const e of a)if(JSON.parse(e.data).dayTime===t.dayTime)throw new Error("Failed to create an event. Time slot is already booked.");if("users"===e)for(const e of a)if(JSON.parse(e.data).name===t.name)throw new Error("Failed to create a user. The user with the same name already exists.")}const r={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:`{"data": "${JSON.stringify(t).replace(/"/g,'\\"')}"}`},s=await fetch(`${this.url}${e}`,r);return await s.json()}async delete(e,t){return(await fetch(`${this.url}${e}/${t}`,{method:"DELETE"})).ok}async update(e,t,a){return(await fetch(`${this.url}${e}/${t}`,{method:"PUT",headers:{"Content-Type":"application/json;charset=utf-8"},body:`{"data": "${JSON.stringify(a).replace(/"/g,'\\"')}"}`})).ok}}const t=new e,a=document.forms.eventForm,r=a.name,s=a.day,o=a.time;window.onload=()=>{a.onsubmit=e=>{if(e.preventDefault(),!(r.value.trim()?(r.classList.remove("input-error"),1):(r.classList.add("input-error"),0))|!("Choose..."===s.value?(s.classList.add("input-error"),0):(s.classList.remove("input-error"),1))|!("Choose..."===o.value?(o.classList.add("input-error"),0):(o.classList.remove("input-error"),1)))return;const a=document.querySelectorAll('input[type="checkbox"]:checked'),n=[];a.forEach((e=>{const t=document.querySelector(`label[for="${e.id}"`);n.push(t.textContent.trim())}));const i={name:r.value,participants:n,dayTime:`${s.value} ${o.value}`};t.create("events",i).then((()=>{r.value="",s.value="Choose...",o.value="Choose...",alert("Event was successfully added to the calendar"),window.location.href="index.html"}),(e=>{console.log(e.message);document.querySelector(".error-msg").setAttribute("style","display: block;")}))}}})();