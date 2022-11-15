function clickFavoritos() {
    const carrinho = document.querySelector("#CC-Header .item-favorite span");
    carrinho.addEventListener('click', () => {
        document.querySelector('.favoritos').classList.add('openFavorito');
        document.querySelector('.favoritos').classList.remove('closeFavorito');
    });

    const background = document.querySelector('section.favoritos');
    background.addEventListener('click', () => {
        document.querySelector('.favoritos').classList.add('closeFavorito');
        document.querySelector('.favoritos').classList.remove('openFavorito');
    });
}

clickFavoritos();