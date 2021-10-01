let emailsForma = document.querySelector('.email-forma');

emailsForma.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch('http://localhost:3000/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ime: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            poruka: document.querySelector('#message').value,
        })
    }).then((resp) => resp.text()).then((data) => console.log(data));
});