function clickLogo() {
    const logo = document.querySelector('#CC-Header .logo');
    logo.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5500/src/home/index.html';
        console.log('ola');
    });
}

clickLogo();
