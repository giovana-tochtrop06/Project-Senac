function clickLogin() {
    const loginFeirante = document.querySelector("div.escolha-content span.feirante");
    loginFeirante.addEventListener('click', () => {
        document.querySelector('.logar').classList.add('openLogar');
        document.querySelector('.logar').classList.remove('closeLogar');
    });

    const loginCliente = document.querySelector("div.escolha-content span.cliente");
    loginCliente.addEventListener('click', () => {
        document.querySelector('.logar').classList.add('openLogar');
        document.querySelector('.logar').classList.remove('closeLogar');
    });

    const backgroundFeirante = document.querySelector('section.logar');
    backgroundFeirante.addEventListener('click', () => {
        document.querySelector('.logar').classList.add('closeLogar');
        document.querySelector('.logar').classList.remove('openLogar');
    });
}

clickLogin();