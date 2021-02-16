import './styles/index.scss';

let db;

const checkboxes = document.getElementById('checkBoxes');
const tableDataElements = document.querySelectorAll('td');

window.addEventListener('load', () => {
  const openRequest = indexedDB.open('calendar', 1);

  openRequest.onupgradeneeded = () => {
	  db = openRequest.result;

	  const eventStore = db.createObjectStore('events', {
		  keyPath: 'id',
		  autoIncrement: true,
	  });

	  eventStore.createIndex('name', 'name', { unique: false });
	  eventStore.createIndex('participants', 'participants', { unique: false });
	  eventStore.createIndex('dayTime', 'dayTime', { unique: true });

	  console.log('Database setup complete');
  };

  openRequest.onerror = () => {
	  console.error('Error', openRequest.error);
  };

  function deleteItem(e) {
    const { currentTarget } = e;
    const { target } = e;

    const modal = My$.modal({
      content: `
			<p>Are You sure You want to delete "Retrospective" event?</p>
		`,
    });

    modal.open();

    const yesBtn = document.querySelector('#yes');
    const noBtn = document.querySelector('#no');

    yesBtn.addEventListener('click', () => {
	  const eventId = Number((currentTarget.parentNode.getAttribute('id')).match(/\d+/));

      const transaction = db.transaction(['events'], 'readwrite');
	  const eventStore = transaction.objectStore('events');

	  eventStore.delete(eventId);

      transaction.oncomplete = () => {
		  target.parentNode.parentNode.setAttribute('data-allowdrop', 'true');
		  target.parentNode.remove();
	  };

      modal.close();
      modal.destroy();
    });

    noBtn.addEventListener('click', () => {
      modal.close();
      modal.destroy();
    });
  }

  function fillCalendar(allMembers) {
    const selectedParticipants = [];
    const participantsCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    participantsCheckboxes.forEach((item) => {
      const label = document.querySelector(`label[for="${item.id}"`);
      selectedParticipants.push(label.textContent.trim());
    });

    const eventStore = db.transaction('events').objectStore('events');

    eventStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;

      if (cursor) {
	    const { participants } = cursor.value;

        if (allMembers === 'all' || My$.arrCompare(participants, selectedParticipants)) {
          const headers = cursor.value.dayTime;
          const td = `td[headers="${headers}"]`;
          const tableItem = document.querySelector(td);

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
        }
	  cursor.continue();
      }
    };
  }

  function cleanCalendar() {
    tableDataElements.forEach((item) => {
      if (item.firstChild) {
        item.firstChild.remove();
      }
    });
  }

  openRequest.onsuccess = () => {
	  console.log('Database opened succesfully');

	  db = openRequest.result;

	  fillCalendar('all');

	  checkboxes.addEventListener('closebox', () => {
		  cleanCalendar();
		  fillCalendar();
	  }, false);

	  function allowDrop(e) {
		  e.preventDefault();
	  }

	  function drag(e) {
		  e.dataTransfer.setData('headers', e.currentTarget.getAttribute('headers'));
	  }

	  function drop(e) {
		  const headers = e.dataTransfer.getData('headers');
		  e.target.appendChild(document.querySelector(`td[headers="${headers}"]`).firstChild);

		  const transaction = db.transaction(['events'], 'readwrite');
		  const eventStore = transaction.objectStore('events');

		  const index = eventStore.index('dayTime');
		  const eventStoreDayTimeRequest = index.get(headers);

		  eventStoreDayTimeRequest.onsuccess = () => {
			  const data = eventStoreDayTimeRequest.result;
			  data.dayTime = e.target.getAttribute('headers');

			  const updateDayTimeRequest = eventStore.put(data);

			  updateDayTimeRequest.onsuccess = () => {
				  console.log('DayTime is update!');
			  };
		  };

		  transaction.oncomplete = () => {
			  console.log('Complete!');
		  };
	  }

	  tableDataElements.forEach((td) => {
      td.addEventListener('dragover', allowDrop);
      td.addEventListener('dragstart', drag);
      td.addEventListener('drop', drop);
    });
  };
});
