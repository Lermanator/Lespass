tasks = {};

function checkIfEmpty() {
    const inputs = document.querySelectorAll('input');
    
    let notEmpty = true;
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value.length == 0) {
            notEmpty = false;
        }
    }
    if(notEmpty) {
        document.getElementById('add').disabled = false;
    }
}

function addTask() {
    const inputs = document.querySelectorAll('input');
    console.log(inputs[2].value);
    let y = inputs[2].value.substring(0,4);
    let m = inputs[2].value.substring(5,7);
    let d = inputs[2].value.substring(8, 10);
    let t = inputs[2].value.substring(11);
    let date = m + "/" + d + "/" + y + " " + t;
    tasks[inputs[0].value] = [inputs[1].value, date];
    saveTasks();
    renderRows();
    inputs[0].value = "";
    inputs[1].value = "";
    document.getElementById('add').disabled = true;
}

function saveTasks() {
    window.localStorage.setItem("bbatasks", JSON.stringify(tasks));
}

function renderRows() {
    tasks = JSON.parse(window.localStorage.getItem("bbatasks"));
    if(tasks == null) {
        tasks = {};
    }
    doneButtonVisible();
    while (document.getElementById("tasks").firstChild) {
        document.getElementById("tasks").removeChild(document.getElementById("tasks").firstChild);
    }
    for(let key in tasks) {
        if(key) {
            let tr = document.createElement("tr");
            tr.classList.add("task");
            let name = document.createElement("th");

            name.scope ="row";
            name.innerHTML = key;

            let desc = document.createElement("td");
            desc.innerHTML = tasks[key][0];

            let date = document.createElement("td");
            date.innerHTML = tasks[key][1];

            let cb = document.createElement("input");
            cb.type = "checkbox";
            cb.classList.add("cb");
            cb.classList.add("form-check-input");
            cb.addEventListener("click", () => doneButton());
            tr.appendChild(name);
            tr.appendChild(desc);
            tr.appendChild(date);
            tr.appendChild(cb);
            document.getElementById("tasks").appendChild(tr);
        }
    }
    
}

function doneButtonVisible() {
    tasks = JSON.parse(window.localStorage.getItem("bbatasks"));
    if((tasks == null) || (Object.keys(tasks).length === 0)) {
        document.getElementById('done').style.visibility = "hidden";
    }
    else {
        document.getElementById('done').style.visibility = "visible";
    }
}

function removeTasks() {
    rows = document.querySelectorAll('.task');
    rows.forEach(row => {
        if(row.lastChild.checked) {
            document.getElementById("tasks").removeChild(row);
            delete tasks[row.firstChild.innerHTML];
            saveTasks();
            document.getElementById('done').disabled = true;
        }
    });
    doneButtonVisible();
}

function doneButton() {
    let clicked = false;
    rows = document.querySelectorAll('.task');
    rows.forEach(row => {
        if(row.lastChild.checked) {
            clicked = true;
        }
    });
    if(clicked) { 
        document.getElementById('done').disabled = false;
    }
    else {
        document.getElementById('done').disabled = true;
    }

}

function setMin() {
    let currentDate = new Date();

    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = currentDate.getFullYear();
    let mins = String(currentDate.getMinutes() + 1).padStart(2, '0');
    let hh = String(currentDate.getHours() + 1).padStart(2, '0');

    let min = yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + mins;
    document.getElementById("tasktime").min = min;
}

window.onload = function() {
    if(window.localStorage.getItem("bbatasks") === null) {
        window.localStorage.setItem("bbatasks", JSON.stringify(tasks));
    }
    renderRows();
    document.querySelectorAll('input').forEach(e => e.addEventListener("input", function(){checkIfEmpty();}));
    document.getElementById('add').addEventListener("click", function(){addTask()});
    document.getElementById('add').disabled = true;
    document.getElementById('done').addEventListener("click", function(){removeTasks()});
    document.getElementById('done').disabled = true;
    document.getElementById('tasktime').addEventListener("click", function(){setMin()});
}
