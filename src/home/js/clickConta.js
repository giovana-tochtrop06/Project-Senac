function clickConta() {
    const conta = document.querySelector('#CC-Header .item-account span');
    conta.addEventListener('click', () => {
        document.querySelector('.header-conta').classList.add('openLogin');
        document.querySelector('.header-conta').classList.remove('closeLogin');
    });

    const background = document.querySelector('section.header-conta');
    background.addEventListener('click', () => {
        document.querySelector('.header-conta').classList.add('closeLogin');
        document.querySelector('.header-conta').classList.remove('openLogin');
    });
}

clickConta();