let pozoviMeForma = document.querySelector('.pozovi-me-forma');

document.addEventListener('DOMContentLoaded', async function () {
    let posts = await getPosts();
    let blogovi = document.querySelector('.blogovi');
    blogovi.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `
        <div class="col-sm-12 col-md-6 col-lg-4">
                  <div class="card">
                      <img class = "card-img-top" src="${post.slikaURL}" alt="${post.naslov}">
                      <div class="card-body">
                          <h4 class="card-title">${post.naslov}</h4>
                          <p class="card-text">${post.opis}</p>
                          <a href="/sight?id=${post.id}" class="btn btn-primary">Више...</a>
                      </div>
                  </div>
              </div>`
        blogovi.insertAdjacentHTML('beforeend', postHTML);
    });
});

pozoviMeForma.addEventListener('submit', function (e) {
    e.preventDefault();
    brTelefonaInput = pozoviMeForma.querySelector('input');
    fetch('http://localhost:3000/pozivi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            brTelefona: brTelefonaInput.value
        })
    }).then((resp) => resp.text()).then(() => alert('Pozvacemo vas uskoro'));
});

