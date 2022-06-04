function changeColor(row) {
    changeClicked(row);
    if(row.style.background == "" || row.style.background == "white") {
        row.style.background = "#91BAD6";
        document.getElementById("select").disabled = false;
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

// function checkForClicked() {
//     let clicked = false;
//     let rows = document.getElementsByTagName("table")[0].rows;
//     for(let i = 0; i < rows.length; i++) {
//         if(rows[i].style.background != "white") {
//             clicked = true;
//         }
//     }
//     return clicked;
// }

// function selected() {
//     if(checkForClicked()) {
//         alert("Choose an intensity!");
//     }
// }

window.onload = function() {
    document.querySelectorAll('#intensities tr').forEach(e => e.addEventListener("click", function(){changeColor(e);}));
    document.getElementById('select').addEventListener("click", function(){selected()});
    document.getElementById("select").disabled = true;
}
