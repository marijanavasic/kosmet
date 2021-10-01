//kod odgovoran za slanje informacija
let kreirajPostForma = document.querySelector('.kreiraj-post-forma');
let kreirajNaslov = document.querySelector('#kreiraj-naslov');
let kreirajGrad = document.querySelector('#kreiraj-grad');
let kreirajSlikuUrl = document.querySelector('#kreiraj-sliku-url');
let kreirajTekst = document.querySelector('#kreiraj-tekst');
let kreirajSlikuFajl = document.querySelector('#kreiraj-sliku-fajl');

kreirajPostForma.addEventListener('submit', function (e) {
    e.preventDefault();
    let tekst = kreirajTekst.value;
    let data = new FormData();
    data.append('naslov', kreirajNaslov.value);
    data.append('grad', kreirajGrad.value);
    data.append('slikaUrl', kreirajSlikuUrl.value);
    data.append('tekst', tekst);
    data.append('opis', tekst.substring(0, tekst.indexOf('.') + 1));
    data.append('slikaFajl', kreirajSlikuFajl.files[0]);

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
    }).then((response) => response.text()).then((data) => window.history.go());
});

function OnemoguciUnos(UrlUnos, fajlUnos) {
    if (UrlUnos.value) {
        fajlUnos.disabled = true;
    } else {
        fajlUnos.disabled = false;
    }
}
kreirajSlikuUrl.addEventListener('change', function () { OnemoguciUnos(this, kreirajSlikuFajl) });
kreirajSlikuFajl.addEventListener('change', function () { OnemoguciUnos(this, kreirajSlikuUrl) });
