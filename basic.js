tasks = {};
window.localStorage.setItem("page", "basic");
chrome.storage.local.set({"page":  "basic"});

function checkIfEmpty() {
    const inputs = document.querySelectorAll('input');
    
    let notEmpty = true;
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value.length == 0) {
            notEmpty = false;
        }
    }

    if(inputs[0].value in tasks) {
        document.getElementById('add').disabled = true;
    }
    else if(notEmpty) {
        document.getElementById('add').disabled = false;
    }
}

function addTask() {
    const inputs = document.querySelectorAll('input');
    tasks[inputs[0].value] = inputs[1].value;
    saveTasks();
    renderRows();
    inputs[0].value = "";
    inputs[1].value = "";
    document.getElementById('add').disabled = true;
}

function saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderRows() {
    tasks = JSON.parse(window.localStorage.getItem("tasks"));
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
            desc.innerHTML = tasks[key];

            let cb = document.createElement("input");
            cb.type = "checkbox";
            cb.classList.add("cb");
            cb.classList.add("form-check-input");
            cb.addEventListener("click", () => doneButton());
            tr.appendChild(name);
            tr.appendChild(desc);
            tr.appendChild(cb);
            document.getElementById("tasks").appendChild(tr);
        }
    }
    
}

function doneButtonVisible() {
    tasks = JSON.parse(window.localStorage.getItem("tasks"));
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

function goBack() {
    window.localStorage.setItem("page", "index");
    window.location.href = "index.html";
}

window.onload = function() {
    if(window.localStorage.getItem("tasks") === null) {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    renderRows();
    document.querySelectorAll('input').forEach(e => e.addEventListener("input", function(){checkIfEmpty();}));
    document.getElementById('add').addEventListener("click", function(){addTask()});
    document.getElementById('add').disabled = true;
    document.getElementById('done').addEventListener("click", function(){removeTasks()});
    document.getElementById('done').disabled = true;
    document.getElementById('back').addEventListener("click", function(){goBack()});
}
