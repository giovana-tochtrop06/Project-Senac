function clickCarrinho() {
    const carrinho = document.querySelector("#CC-Header .item-minicart span");
    carrinho.addEventListener('click', () => {
        document.querySelector('.carrinho').classList.add('openCarrinho');
        document.querySelector('.carrinho').classList.remove('closeCarrinho');
    });

    const background = document.querySelector('section.carrinho');
    background.addEventListener('click', () => {
        document.querySelector('.carrinho').classList.add('closeCarrinho');
        document.querySelector('.carrinho').classList.remove('openCarrinho');
    });
}

clickCarrinho();
