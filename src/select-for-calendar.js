import './styles/select.scss';

let show = true;

const checkBoxList = document.querySelectorAll('input[type="checkbox"]');
const selectBox = document.querySelector('.selectBox');
const checkboxes = document.getElementById('checkBoxes');
const closeSelectBox = new Event('closebox');

function showCheckboxes() {
  if (show) {
    checkboxes.style.display = 'block';
    checkboxes.style.zIndex = '100';
    show = false;
  } else {
    checkboxes.style.display = 'none';
    show = true;
    checkboxes.dispatchEvent(closeSelectBox);
  }
}

selectBox.addEventListener('click', showCheckboxes);

window.addEventListener('load', () => {
  for (const item of checkBoxList) {
    item.checked = true;
  }
});

const checkBoxArray = Array.prototype.slice.call(checkBoxList);
const allMemCheckBox = checkBoxArray.shift();

allMemCheckBox.addEventListener('click', () => {
  if (allMemCheckBox.checked) {
    for (const item of checkBoxList) {
      item.checked = true;
    }
  } else {
    for (const item of checkBoxList) {
      item.checked = false;
    }
  }
});

for (const item of checkBoxArray) {
  item.addEventListener('click', () => {
    let count = 0;
    for (const el of checkBoxArray) {
      if (el.checked) {
        count += 1;
      }
    }
    console.log(checkBoxArray.length);
    if (checkBoxArray.length === count && allMemCheckBox.checked === false) {
      allMemCheckBox.checked = true;
    }
    if (checkBoxArray.length !== count && allMemCheckBox.checked) {
      allMemCheckBox.checked = false;
    }
  });
}
