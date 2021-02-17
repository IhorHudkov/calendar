import './styles/create-event.scss';

const form = document.forms.eventForm;
const nameInput = form.name;
const dayInput = form.day;
const timeInput = form.time;

const isNameInputCorrect = () => {
  if (!nameInput.value.trim()) {
    nameInput.classList.add('input-error');
    return false;
  }
  nameInput.classList.remove('input-error');
  return true;
};

const isDayInputCorrect = () => {
  if (dayInput.value === 'Choose...') {
    dayInput.classList.add('input-error');
    return false;
  }
  dayInput.classList.remove('input-error');
  return true;
};

const isTimeInputCorrect = () => {
  if (timeInput.value === 'Choose...') {
    timeInput.classList.add('input-error');
    return false;
  }
  timeInput.classList.remove('input-error');
  return true;
};

let db;

window.onload = () => {
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

  openRequest.onsuccess = () => {
    console.log('Database opened succesfully');
    db = openRequest.result;
  };

  form.onsubmit = (e) => {
    e.preventDefault();

    if (!isNameInputCorrect() | !isDayInputCorrect() | !isTimeInputCorrect()) return;

    const participantsCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    const participants = [];

    participantsCheckboxes.forEach((item) => {
      const label = document.querySelector(`label[for="${item.id}"`);
      participants.push(label.textContent.trim());
    });

    const event = {
      name: nameInput.value,
      participants,
      dayTime: `${dayInput.value} ${timeInput.value}`,
    };

    const transaction = db.transaction(['events'], 'readwrite');

    const eventStore = transaction.objectStore('events');

    const addRequest = eventStore.add(event);
    addRequest.onsuccess = () => {
      nameInput.value = '';
      dayInput.value = 'Choose...';
      timeInput.value = 'Choose...';
    };

    transaction.oncomplete = () => {
      console.log('Transaction completed: database modification finished.');
      window.location.href = 'index.html';
    };

    transaction.onerror = () => {
      const errHeader = document.querySelector('.error-msg');
      errHeader.setAttribute('style', 'display: block;');
      console.log('Transaction not opened due to error');
    };
  };
};
