function clickEscolha() {
    const loginAll = document.querySelectorAll("span#Hello-Login");

    loginAll.forEach((login) => {
        login.addEventListener('click', () => {
            document.querySelector('.escolha').classList.add('openEscolha');
            document.querySelector('.escolha').classList.remove('closeEscolha');
        });
    })

    const background = document.querySelector('section.escolha');
    background.addEventListener('click', () => {
        document.querySelector('.escolha').classList.add('closeEscolha');
        document.querySelector('.escolha').classList.remove('openEscolha');
    });
}

clickEscolha();