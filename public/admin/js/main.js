let dodajPostBtn = document.querySelector('.kreiraj-post-dugme');
let odjavaBtn = document.querySelector('.log-out-btn');

document.addEventListener('DOMContentLoaded', async function () {
    dodajPost();
    dodajPozive();
    dodajEmail();
});

dodajPostBtn.addEventListener('click', function () {
    let blogoviTab = document.getElementById('v-pills-blogovi');
    blogoviTab.classList.remove('show');
    blogoviTab.classList.remove('active');
    let kreirajPostTab = document.getElementById('v-pills-kreiraj-post');
    kreirajPostTab.classList.add('show');
    kreirajPostTab.classList.add('active');
});

async function dodajPost() {
    let posts = await getPosts();
    let blogovi = document.querySelector('.blogovi');
    blogovi.innerHTML = '';
    let i = 1; //za cuvanje rednog broja posta
    posts.forEach((post) => {
        let postHTML = `
        <blog class="d-flex justify-content-between align-items-center blogovi-inline">
            <div class="rb w5">${i++}</div>
            <input class="id" type="hidden" value="${post.id}">
            <div class="naslov w30">${post.naslov}</div>
            <div class="datum w30">${post.datum}</div>
            <div class="grad w20">${post.grad}</div>
            <div class="izmeni w10"><button class="btn btn-link btn-izmeni">Измени</button></div>
            <div class="izbrisi w5"><button class="btn btn-link btn-brisi">X</button></div>
        </blog>`
        blogovi.insertAdjacentHTML('beforeend', postHTML);
    });
}

async function dodajPozive() {
    let pozivi = await getPozivi();
    let poziviBlok = document.querySelector('#v-pills-pozivi');
    poziviBlok.innerHTML = '';
    let i = 1; //za cuvanje rednog broja posta
    pozivi.forEach((poziv) => {
        let pozivHTML = `
        <blog class="d-flex justify-content-between align-items-center blogovi-inline">
            <div class="rb w5">${i++}</div>
            <input class="id" type="hidden" value="${poziv.id}">
            <div class="naslov w45">${poziv.brTelefona}</div>
            <div class="datum w45">${poziv.datum}</div>
            <div class="izbrisi w5"><button class="btn btn-link btn-brisi">X</button></div>
        </blog>`
        poziviBlok.insertAdjacentHTML('beforeend', pozivHTML);
    });
}

async function dodajEmail() {
    let emails = await getEmails();
    let emailsBlok = document.querySelector('#v-pills-mejlovi');
    emailsBlok.innerHTML = '';
    let i = 1; //za cuvanje rednog broja posta
    emails.forEach((email) => {
        let emailHTML = `
        <blog class="d-flex justify-content-between align-items-center blogovi-inline">
            <div class="rb w5">${i++}</div>
            <input class="id" type="hidden" value="${email.id}">
            <div class="ime w30">${email.ime}</div>
            <div class="email w30">${email.email}</div>
            <div class="datum w30">${email.datum}</div>
            <div class="izbrisi w5"><button class="btn btn-link btn-brisi">X</button></div>
            <div class="poruka w100">${email.poruka}</div>
        </blog>`
        emailsBlok.insertAdjacentHTML('beforeend', emailHTML);
    });
}

//Odjava sa admin stranice i preusmeravanje na pocetnu stranicu web sajta
odjavaBtn.addEventListener('click', function () {
    //brisanje kolacica
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    //vracanje nazad na pocetnu stranicu
    window.location.href = '/';
});