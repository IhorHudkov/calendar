import CalendarEvent from './models/event';
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

window.onload = () => {
  form.onsubmit = (e) => {
    e.preventDefault();

    if (!isNameInputCorrect() | !isDayInputCorrect() | !isTimeInputCorrect()) return;

    const participantsCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    const participants = [];

    participantsCheckboxes.forEach((item) => {
      const label = document.querySelector(`label[for="${item.id}"`);
      participants.push(label.textContent.trim());
    });

    const newEvent = {
      name: nameInput.value,
      participants,
      dayTime: `${dayInput.value} ${timeInput.value}`
    };

    const event = new CalendarEvent(newEvent);

    event.createEvent()
      .then(
        () => {
          nameInput.value = '';
          dayInput.value = 'Choose...';
          timeInput.value = 'Choose...';
          alert('Event was successfully added to the calendar');
          window.location.href = 'index.html';
        },
        (error) => {
          console.log(error.message);
          const errHeader = document.querySelector('.error-msg');
          errHeader.setAttribute('style', 'display: block;');
        }
      );
  };
};
