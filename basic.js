function checkIfEmpty(cell) {
}

window.onload = function() {
    document.querySelectorAll('#name').forEach(e => e.addEventListener("click", function(){checkIfEmpty(e);}));
    document.querySelectorAll('#desc').forEach(e => e.addEventListener("click", function(){checkIfEmpty(e);}));
    document.getElementById('add').disabled = true;
}
