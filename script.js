let groceryItems = [];

function renderGrocery(grocery) {
    const list = document.querySelector('.js-grocery-list');
    list.insertAdjacentHTML('beforeend', `
        <li class="grocery-item" data-key="${grocery.id}">
            <input id="${grocery.id}" type="checkbox" />
            <label for="${grocery.id}" class="tick js-tick"></label>
            <span>${grocery.text}</span>
            <button class="delete-grocery js-delete-grocery">
                <svg><use href="#delete-icon"></use></svg>
            </button>
        </li>
    `);
}

function addGrocery(text) {
    const grocery = {
        text,
        checked: false,
        id: Date.now(),
    };

    groceryItems.push(grocery);
    renderGrocery(grocery);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.querySelector('.js-grocery-input');

    const text = input.value.trim();
    if (text !== '') {
        addGrocery(text);
        input.value = '';
        input.focus();
    }
});