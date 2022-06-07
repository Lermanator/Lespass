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
    while (document.getElementById("tasks").firstChild) {
        document.getElementById("tasks").removeChild(document.getElementById("tasks").firstChild);
    }
    for(let key in tasks) {
        if(key) {
            let tr = document.createElement("tr");
            let name = document.createElement("th");

            name.scope ="row";
            name.innerHTML = key;

            let desc = document.createElement("td");
            desc.innerHTML = tasks[key];

            tr.appendChild(name);
            tr.appendChild(desc);
            document.getElementById("tasks").appendChild(tr);
        }
    }
}

window.onload = function() {
    renderRows();
    document.querySelectorAll('input').forEach(e => e.addEventListener("input", function(){checkIfEmpty();}));
    document.getElementById('add').addEventListener("click", function(){addTask()});
    document.getElementById('add').disabled = true;
}
