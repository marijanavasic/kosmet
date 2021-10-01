async function getPozivi() {
    return await fetch('http://localhost:3000/pozivi')
        .then((response) => response.json())
        .then((data) => data);
}


let poziviBlok = document.querySelector('#v-pills-pozivi');

poziviBlok.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-brisi')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/pozivi/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
            .then(() => window.history.go());
    }
});