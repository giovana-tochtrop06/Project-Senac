function clickDep() {
    const departamento = document.querySelector('.dep-nav-wrapper span');
    departamento.addEventListener('click', () => {
        document.querySelector('.department').classList.add('open');
        document.querySelector('.department').classList.remove('close');
    });

    const background = document.querySelector('section.department');
    background.addEventListener('click', () => {
        document.querySelector('.department').classList.add('close');
        document.querySelector('.department').classList.remove('open');
    });
}

clickDep();