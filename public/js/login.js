let prijavaForma = document.querySelector('.prijavi-se-forma');
let registracijaForma = document.querySelector('.registruj-se-forma');

prijavaForma.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('prijavi-se-email').value;
    let sifra = document.getElementById('prijavi-se-sifra').value;
    fetch('http://localhost:3000/korisnici/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, sifra })
    }).then((resp) => {
        if (resp.status === 400) {
            throw new Error();
        }
        return resp.json();
    }).then((data) => {
        window.location.href = data.redirectURL;
    }).catch(() => alert('Погрешна имејл адреса или шифра!'))
});

registracijaForma.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('registruj-se-email').value;
    let sifra = document.getElementById('registruj-se-sifra').value;
    let ponoviSifru = document.getElementById('ponovi-sifru').value;
    if (sifra !== ponoviSifru) {
        return;
    }
    fetch('http://localhost:3000/korisnici/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, sifra })
    }).then((resp) => resp.text()).then((data) => alert(data))
});