import allUsers from './create-users';

const options = () => {
  let optionsStr = '';
  for (const user of allUsers) {
    optionsStr += `<option value="${user.name}">${user.name}</option>\n\t`;
  }
  return optionsStr;
};

const authModal = My$.modal({
  content: `
    <p>Please, authorise</p>
    <p id="role"></p>
    <select class="form-select form-select-lg mb-3" id="auth-select">
        <option selected>Select a name</option>
        ${options()}
    </select>
    <div class="modal-buttons">
        <button type="button" class="btn btn-primary" id="confirm">Confirm</button>
    </div>
  `,
});

export default authModal;
