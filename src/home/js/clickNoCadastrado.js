function clickNoCadastrado() {
    const login = document.querySelector("div.logar-body span.no-cadastrado");
    login.addEventListener('click', () => {
        document.querySelector('.no-cadastro').classList.add('openCadastro');
        document.querySelector('.no-cadastro').classList.remove('closeCadastro');
    });

    const background = document.querySelector('section.no-cadastro');
    background.addEventListener('click', () => {
        document.querySelector('.no-cadastro').classList.add('closeCadastro');
        document.querySelector('.no-cadastro').classList.remove('openCadastro');
    });
}

clickNoCadastrado();