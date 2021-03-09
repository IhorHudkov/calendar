import './styles/index.scss';
import authModal from './auth-modal';
import allUsers from './create-users';
import CalendarEvent from './models/event';
import { restClient } from './models/client';

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
  function deleteItem(e) {
    const { currentTarget } = e;
    const { target } = e;

    modal.open();

    const yesBtn = document.querySelector('#yes');
    const noBtn = document.querySelector('#no');

    const noBtnClickHandler = () => {
      modal.close();
      yesBtn.removeEventListener('click', yesBtnClickHandler);
      noBtn.removeEventListener('click', noBtnClickHandler);
    };

    const yesBtnClickHandler = () => {
      const eventId = currentTarget.parentNode.getAttribute('id');

      restClient.delete('events', eventId)
        .then(
          (ok) => {
            if (ok) {
              target.parentNode.remove();
              modal.close();
              console.log(eventId);
              alert('Event successfully deleted!');
            } else {
              modal.close();
              alert('Something went wrong!');
            }
            yesBtn.removeEventListener('click', yesBtnClickHandler);
            noBtn.removeEventListener('click', noBtnClickHandler);
          },
          (error) => {
            modal.close();
            alert(error.message);
            yesBtn.removeEventListener('click', yesBtnClickHandler);
            noBtn.removeEventListener('click', noBtnClickHandler);
          }
        );
    };

    yesBtn.addEventListener('click', yesBtnClickHandler);

    noBtn.addEventListener('click', noBtnClickHandler);
  }

  function fillCalendar(allMembers) {
    const selectedParticipants = [];
    const participantsCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    participantsCheckboxes.forEach((item) => {
      const label = document.querySelector(`label[for="${item.id}"`);
      selectedParticipants.push(label.textContent.trim());
    });

    restClient.getAll('events')
      .then(
        (allEvents) => {
          if (allEvents) {
            allEvents.forEach((event) => {
              const { participants } = event;

              if (allMembers === 'all' || My$.arrCompare(participants, selectedParticipants)) {
                const headers = (JSON.parse(event.data)).dayTime;
                const td = `td[headers="${headers}"]`;
                const tableItem = document.querySelector(td);

                const tdContent = document.createElement('div');
                const eventName = document.createElement('span');
                const deleteBtn = document.createElement('span');

                tdContent.setAttribute('id', event.id);
                tdContent.setAttribute('draggable', 'true');

                deleteBtn.innerHTML = '&times;';
                eventName.textContent = (JSON.parse(event.data)).name;

                tableItem.appendChild(tdContent);
                tdContent.appendChild(eventName);
                tdContent.appendChild(deleteBtn);

                tdContent.classList.add('td-content');
                deleteBtn.classList.add('td__delete-btn');

                deleteBtn.addEventListener('click', deleteItem);
              }
            });
          }
        }
      );
  }

  function cleanCalendar() {
    tableDataElements.forEach((item) => {
      if (item.firstChild) {
        item.firstChild.remove();
      }
    });
  }

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

		  CalendarEvent.getEventByDayTime(headers)
      .then(
        (desiredEvent) => {
          const dayTime = e.target.getAttribute('headers');
          const newData = {
            name: (JSON.parse(desiredEvent.data)).name,
            participants: (JSON.parse(desiredEvent.data)).participants,
            dayTime
          };
          const result = { desiredEvent, newData };
          return result;
        }
      )
      .then(
        (result) => {
          restClient.update('events', result.desiredEvent.id, result.newData)
            .then(
              (ok) => { ok ? alert('Successfully updated!') : alert('Something went wrong :('); },
              (error) => {
                console.log(result.desiredEvent.id);
                console.log(result.newData);
                alert(`${error.message}`);
              }
            );
        }
      );
	  }

	  tableDataElements.forEach((td) => {
    td.addEventListener('dragover', allowDrop);
    td.addEventListener('dragstart', drag);
    td.addEventListener('drop', drop);
  });

  authModal.open();

  const selectEl = document.querySelector('#auth-select');

  const getSelectedUser = () => {
    const $selectedUser = document.querySelector('#auth-select>option:checked').value;
    let selectedUser;

    if ($selectedUser !== 'Select a name') {
      selectedUser = allUsers.find((user) => {
        if (user.name === $selectedUser) return user;
        return false;
      });
    }
    return selectedUser;
  };

  selectEl.onchange = () => {
    document.getElementById('role').innerText = `Role: ${getSelectedUser() ? getSelectedUser().role : ''}`;
  };

  const confirmBtn = document.querySelector('#confirm');

  confirmBtn.onclick = () => {
    let userRole;

    if (getSelectedUser()) {
      userRole = getSelectedUser().role;
      authModal.close();
    }

    if (userRole === 'user') {
      document.querySelector('#new-event-btn').style.display = 'none';
      document.querySelector('.select-names').style.marginRight = 0;

      tableDataElements.forEach((td) => {
        td.removeEventListener('dragover', allowDrop);
        td.removeEventListener('dragstart', drag);
        td.removeEventListener('drop', drop);
      });

      const delBtns = document.querySelectorAll('.td__delete-btn');
      console.log(delBtns);
      for (const delBtn of delBtns) {
        delBtn.style.display = 'none';
      }
    }
  };
});
