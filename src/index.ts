import departamento from 'departamento.html'

function openDepartament(): void {
    const body = document.querySelector('body');
    body?.insertAdjacentElement('beforeend', departamento);
}

function clickDepartament(): void {
    const btnDepartament = document.querySelector('div.dep-nav-wrapper span');

    btnDepartament?.addEventListener('click', () => {

    });
}

function init() {

}
init();

