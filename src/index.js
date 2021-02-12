import './styles/index.scss'

let db;
const tableDataElements = document.querySelectorAll('td');


window.onload = function () {
  
  
  
  
  
  let openRequest = indexedDB.open("calendar", 1);

  openRequest.onupgradeneeded = function () {
    db = openRequest.result;
    let eventStore = db.createObjectStore("events", {
      keyPath: "id",
      autoIncrement: true,
    });
    eventStore.createIndex("name", "name", { unique: false });
    eventStore.createIndex("participants", "participants", { unique: false });
    eventStore.createIndex("dayTime", "dayTime", { unique: true });
    console.log("Database setup complete");
  };

  openRequest.onerror = function () {
    console.error("Error", openRequest.error);
  };

  openRequest.onsuccess = function () {
    console.log("Database opened succesfully");
    db = openRequest.result;
	fillCalendar();

	
	for (let td of tableDataElements) {
		td.setAttribute('data-allowdrop', 'true');
		td.addEventListener('dragover', allowDrop);
		td.ondragstart = drag;
		td.addEventListener('drop', drop);
	}	

	function allowDrop (e) {
		e.preventDefault();
	} 
	
	function drag (e) {
		e.dataTransfer.setData('headers', e.currentTarget.getAttribute('headers'));
	}
	
	function drop (e) {
		let headers = e.dataTransfer.getData('headers');
		e.target.appendChild(document.querySelector(`td[headers="${headers}"]`).firstChild);
		let transaction = db.transaction(['events'], 'readwrite');
		let eventStore = transaction.objectStore('events');
		let index = eventStore.index('dayTime');
		let eventStoreDayTimeRequest = index.get(headers);
		eventStoreDayTimeRequest.onsuccess = () => {
			const data = eventStoreDayTimeRequest.result;
			data.dayTime = e.target.getAttribute('headers');
			const updateDayTimeRequest = eventStore.put(data);
			updateDayTimeRequest.onsuccess = () => {
			  console.log('DayTime is update!');
			};
		}
		transaction.oncomplete = function () {
		  console.log('Complete!');
		};
	}
  };
 
  
  
  function fillCalendar() {
	let eventStore = db.transaction('events').objectStore('events');
    eventStore.openCursor().onsuccess = function(e) {
      
      let cursor = e.target.result;

      if(cursor) {
        
		const headers = cursor.value.dayTime;
		console.log(headers);
		const td = `td[headers="${headers}"]`;
		console.log(td);
		const tableItem = document.querySelector(td);
        console.log(tableItem);
		tableItem.setAttribute('data-allowdrop', 'false');
		const tdContent = document.createElement('div');
     	const eventName = document.createElement('span');
		const deleteBtn = document.createElement('span');
		tdContent.setAttribute('id', `event-${cursor.value.id}`);
		tdContent.setAttribute('draggable', 'true');
        deleteBtn.innerHTML = '&times;';
		eventName.textContent = cursor.value.name;
		tableItem.appendChild(tdContent);
		tdContent.appendChild(eventName);
		tdContent.appendChild(deleteBtn);
		tdContent.classList.add('td-content');
		deleteBtn.classList.add('td__delete-btn');
		deleteBtn.onclick = deleteItem;
		cursor.continue();

      } else {       
        console.log('Notes all displayed');
      }
	  
	  
	  
    };
  };
  
  function deleteItem(e) {
	
	
	let eventId = Number((e.currentTarget.parentNode.getAttribute('id')).match(/\d+/));
	let transaction = db.transaction(['events'], 'readwrite');
	let eventStore = transaction.objectStore('events');
	let request = eventStore.delete(eventId);
	transaction.oncomplete = function () {
		e.target.parentNode.parentNode.setAttribute('data-allowdrop', 'true');
		e.target.parentNode.remove();
	};
	console.log("Delete!");
  }
 
 };