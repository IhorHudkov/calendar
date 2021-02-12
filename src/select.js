let show = true;

function showCheckboxes() {
    let checkboxes = document.getElementById("checkBoxes");

    if (show) {
        checkboxes.style.display = "block";
        checkboxes.style.zIndex = "100";
        show = false;
    } else {
        checkboxes.style.display = "none";
        show = true;
    }
}