let blogoviBlok = document.querySelector('.blogovi');

blogoviBlok.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-brisi')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/posts/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
            .then(() => window.history.go());
    }
});