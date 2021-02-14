import './styles/select.scss'

let show = true;
const checkBoxList = document.querySelectorAll('input[type="checkbox"]');
const selectBox =  document.querySelector('.selectBox');
selectBox.addEventListener('click', showCheckboxes);

let checkboxes = document.getElementById("checkBoxes");

function showCheckboxes() {

    if (show) {
        checkboxes.style.display = "block";
        checkboxes.style.zIndex = "100";
        show = false;
    } else {
        checkboxes.style.display = "none";
        show = true;
    }
}

let checkBoxArray = Array.prototype.slice.call(checkBoxList);
const allMemCheckBox = checkBoxArray.shift();

console.clear();
console.log(checkBoxArray);
console.log(allMemCheckBox);

allMemCheckBox.addEventListener('click', () => {
    if (allMemCheckBox.checked) {
        for (let item of checkBoxList) {
            item.checked = true;
        }
    }else{
        for (let item of checkBoxList) {
            item.checked = false;
        }
    }
});


for (let i of checkBoxArray) {
    i.addEventListener('click', () => {
        let count = 0;
        for (let j of checkBoxArray) {
            if ( j.checked ) {
                count++;
            }
        }
        console.log(checkBoxArray.length);
        if (checkBoxArray.length == count && allMemCheckBox.checked == false) {
            allMemCheckBox.checked = true;
        }
        if (checkBoxArray.length !== count && allMemCheckBox.checked) {
            allMemCheckBox.checked = false;
        }

    });
}

