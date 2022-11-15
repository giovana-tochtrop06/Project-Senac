function clickLogin() {
    const login = document.querySelector("div.conta-nav-header span");
    login.addEventListener('click', () => {
        document.querySelector('.logar').classList.add('openLogar');
        document.querySelector('.logar').classList.remove('closeLogar');
    });

    const background = document.querySelector('section.logar');
    background.addEventListener('click', () => {
        document.querySelector('.logar').classList.add('closeLogar');
        document.querySelector('.logar').classList.remove('openLogar');
    });

    const loginDep = document.querySelector("div.depart-nav-header span");
    loginDep.addEventListener('click', () => {
        document.querySelector('.logar').classList.add('openLogar');
        document.querySelector('.logar').classList.remove('closeLogar');
    });

    const backgroundDep = document.querySelector('section.departament');
    backgroundDep.addEventListener('click', () => {
        document.querySelector('.logar').classList.add('closeLogar');
        document.querySelector('.logar').classList.remove('openLogar');
    });
}

clickLogin();