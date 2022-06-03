function changeColor(row) {
    checkForClicked();
    if(row.style.background == "" || row.style.background =="white") {
        row.style.background = "#ADD8E6";
    }
    else {
        row.style.background = "white";
    }
}

function checkForClicked() {
    var rows = document.getElementsByTagName("table")[0].rows;
    for(let i = 0; i < rows.length; i++) {
        if(rows[i].style.background != "white") {
            rows[i].style.background = "white";
        }
    }
}
