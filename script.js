let groceryItems = [];

function addGrocery(text) {
    const grocery = {
        text,
        checked: false,
        id: Date.now(),
    };

    groceryItems.push(grocery);
    console.log(groceryItems);
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