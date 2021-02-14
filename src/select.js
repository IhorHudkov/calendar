import './styles/select.scss'

let show = true;

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

