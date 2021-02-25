import './styles/index.scss';
import authModal from './auth-modal';
import allUsers from './create-users';

let db;

const checkboxes = document.getElementById('checkBoxes');
const tableDataElements = document.querySelectorAll('td');

const modal = My$.modal({
  content: `
    <p>Are You sure You want to delete "Retrospective" event?</p>
    <div class="modal-buttons">
      <button type="button" class="btn btn-danger" id="yes">Yes</button>
      <button type="button" class="btn btn-outline-dark" id="no">No!</button>
    </div>
  `,
});

window.addEventListener('load', () => {
  authModal.open();

  const confirmBtn = document.querySelector('#confirm');

  confirmBtn.onclick = () => {
    const currentUser = document.querySelector('#auth-select>option:checked').value;
    let userRole;

    if (currentUser !== 'Select a name') {
      userRole = allUsers.find((user) => {
        if (user.name === currentUser) return user;
        return false;
      }).role;
      console.log(userRole);
      authModal.close();
    }

    if (userRole === 'user') {
      document.querySelector('#new-event-btn').style.display = 'none';
      document.querySelector('.select-names').style.marginRight = 0;
    }
  };

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

    modal.open();

    const yesBtn = document.querySelector('#yes');
    const noBtn = document.querySelector('#no');

    yesBtn.addEventListener('click', () => {
	  const eventId = Number((currentTarget.parentNode.getAttribute('id')).match(/\d+/));

      const transaction = db.transaction(['events'], 'readwrite');
	  const eventStore = transaction.objectStore('events');

	  eventStore.delete(eventId);

      transaction.oncomplete = () => {
		  target.parentNode.remove();
	  };

      modal.close();
    });

    noBtn.addEventListener('click', () => {
      modal.close();
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
