const products = [
    { name: "Klassisk Tvådelad", description: "Klassisk tvådelad kostym.", image: "bilder/framsida1.avif" },
    { name: "Modern Kavaj", description: "Modern kavaj för business-casual.", image: "bilder/kostym1.jpg" },
    { name: "Tredelad", description: "Tredelad kostym för bröllop.", image: "bilder/kostym3.jpg" }
];

const productContainer = document.querySelector('.row');
const cartItems = document.getElementById('cartItems');


products.forEach(product => {
    const productHTML = `
        <div class="col-md-4">
            <div class="box">
                <img src="${product.image}" alt="${product.name}" class="img-fluid">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <button class="btn btn-primary add-to-cart">Lägg till i kundvagn</button>
            </div>
        </div>`;
    productContainer.innerHTML += productHTML;
});


document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
        const productName = e.target.parentElement.querySelector('h2').textContent;

        
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `${productName} <button class="btn btn-danger btn-sm remove-item">Ta bort</button>`;
        cartItems.appendChild(listItem);

        
        const emptyMessage = document.querySelector('.empty-message');
        if (emptyMessage) emptyMessage.remove();

        
        showPopup(`${productName} har lagts till i kundvagnen!`);
    }

    
    if (e.target.classList.contains('remove-item')) {
        e.target.parentElement.remove();

        
        if (cartItems.children.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'list-group-item empty-message';
            emptyMessage.textContent = 'Din kundvagn är tom.';
            cartItems.appendChild(emptyMessage);
        }
    }

    
    if (e.target.classList.contains('checkout')) {
        cartItems.innerHTML = '<li class="list-group-item empty-message">Din kundvagn är tom.</li>';
        showPopup("Tack för ditt köp!");
    }
});


function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}
