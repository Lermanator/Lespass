var urls = [];
window.localStorage.setItem("page", "urls");
chrome.storage.local.set({"page":  "urls"});

function checkIfEmpty() {
    const inputs = document.querySelectorAll('input');
    
    let notEmpty = true;
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value.length == 0) {
            notEmpty = false;
        }
    }
    if(urls.includes(inputs[0].value)) {
        document.getElementById('add').disabled = true;
    }
    else if(notEmpty) {
        document.getElementById('add').disabled = false;
    }
}

function addUrl() {
    const inputs = document.querySelectorAll('input');
    urls.push(inputs[0].value)
    saveTasks();
    renderRows();
    inputs[0].value = "";
    document.getElementById('add').disabled = true;
}

function saveTasks() {
    window.localStorage.setItem("urls", JSON.stringify(urls));
    chrome.storage.local.set({"urls":  JSON.stringify(urls)})
}

function renderRows() {
    urls = JSON.parse(window.localStorage.getItem("urls"));
    if(urls == null) {
        urls = {};
    }
    doneButtonVisible();
    while (document.getElementById("urls").firstChild) {
        document.getElementById("urls").removeChild(document.getElementById("urls").firstChild);
    }
    for(let i = 0; i < urls.length; i++) {
        let tr = document.createElement("tr");
        tr.classList.add("task");
        let name = document.createElement("th");

        name.scope ="row";
        name.innerHTML = urls[i];

        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.classList.add("cb");
        cb.classList.add("form-check-input");
        cb.addEventListener("click", () => doneButton());
        tr.appendChild(name);
        tr.appendChild(cb);
        document.getElementById("urls").appendChild(tr);
    }
    
}

function doneButtonVisible() {
    urls = JSON.parse(window.localStorage.getItem("urls"));
    if((urls == null) || (urls.length === 0)) {
        document.getElementById('done').style.visibility = "hidden";
    }
    else {
        document.getElementById('done').style.visibility = "visible";
    }
}

function removeUrls() {
    rows = document.querySelectorAll('.task');
    rows.forEach(row => {
        if(row.lastChild.checked) {
            document.getElementById("urls").removeChild(row);
            urls.splice(urls.indexOf(row.firstChild.innerHTML), 1);
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
    window.localStorage.setItem("page", "lespass");
    window.location.href = "lespass.html";
}

window.onload = function() {
    if(window.localStorage.getItem("urls") === null) {
        window.localStorage.setItem("urls", JSON.stringify(urls));
    }
    renderRows();
    document.querySelectorAll('input').forEach(e => e.addEventListener("input", function(){checkIfEmpty();}));
    document.getElementById('add').addEventListener("click", function(){addUrl()});
    document.getElementById('add').disabled = true;
    document.getElementById('done').addEventListener("click", function(){removeUrls()});
    document.getElementById('done').disabled = true;
    document.getElementById('back').addEventListener("click", function(){goBack()});
}
