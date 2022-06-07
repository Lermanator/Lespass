function checkIfEmpty() {
    let inputs = document.querySelectorAll('input');
    
    let notEmpty = true;
    for(let i = 0; i < inputs.length; i++) {
        console.log(inputs[i].value)
        if(inputs[i].value.length == 0) {
            notEmpty = false;
        }
    }
    if(notEmpty) {
        document.getElementById('add').disabled = false;
    }
}

window.onload = function() {
    document.querySelectorAll('input').forEach(e => e.addEventListener("input", function(){checkIfEmpty();}));
    document.getElementById('add').disabled = true;
}
