{
    let blogoviBlok = document.querySelector('.blogovi');
    let izmeniForma = document.querySelector('.izmeni-post-forma');
    let naslovInput = document.querySelector('#izmeni-naslov');
    let tekstInput = document.querySelector('#izmeni-tekst');
    let id;

    blogoviBlok.addEventListener('click', async function (e) {
        if (e.target.classList.contains('btn-izmeni')) {
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' + id)
                .then((resp) => resp.json())
                .then((data) => data);

            naslovInput.value = postInfo.naslov;
            tekstInput.value = postInfo.tekst;

            let blogoviTab = document.getElementById('v-pills-blogovi');
            blogoviTab.classList.remove('show');
            blogoviTab.classList.remove('active');
            let izmeniPostTab = document.getElementById('v-pills-izmeni-post');
            izmeniPostTab.classList.add('show');
            izmeniPostTab.classList.add('active');
        }
    });

    izmeniForma.addEventListener('submit', function (e) {
        e.preventDefault();
        fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                naslov: naslovInput.value,
                tekst: tekstInput.value,
                opis: tekstInput.value.substring(0, tekstInput.value.indexOf('.') + 1)
            })
        }).then((resp) => resp.text())
            .then(() => window.history.go());
    })

}