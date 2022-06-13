var clickedRow = null;

function changeColor(row) {
    changeClicked(row);
    if(row.style.background == "" || row.style.background == "white") {
        row.style.background = "#91BAD6";
        document.getElementById("select").disabled = false;
        clickedRow = row.id;
    }
    else {
        row.style.background = "white";
        document.getElementById("select").disabled = true;
    }
}

function changeClicked(row) {
    let rows = document.getElementsByTagName("table")[0].rows;
    for(let i = 0; i < rows.length; i++) {
        if(rows[i].style.background != "white" && rows[i] !== row) {
            rows[i].style.background = "white";
        }
    }
}

function changePage() {
    let loc = clickedRow + ".html"
    window.location.href = loc;
}



window.onload = function() {
    if(window.localStorage.getItem("page") == "index") {}
    else if(window.localStorage.getItem("page") == null) {
        window.localStorage.setItem("page", "index");
    }
    else {
        let loc = window.localStorage.getItem("page") + ".html"
        window.location.href = loc;
    }
    document.querySelectorAll('#intensities tr').forEach(e => e.addEventListener("click", function(){changeColor(e);}));
    document.getElementById('select').addEventListener("click", function(){changePage()});
    document.getElementById("select").disabled = true;
}
