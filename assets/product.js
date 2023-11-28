const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id')

async function fetchProductById(productId) {

    const response = await fetch('https://dummyjson.com/products');
    const products = await response.json();

    const selectedProduct = products.products.find(product => product.id === parseInt(productId));
    
    return selectedProduct;
}

async function displayProductDetails() {
    const productDetails = document.getElementById('product-details');

    try {
        const selectedProduct = await fetchProductById(productId);


        // images
        const imageDiv = document.getElementById('imageDiv');
        let imgCounter = 0;
        selectedProduct.images.forEach(image => {
            let imageCard = document.createElement('div')
            imageCard.classList.add("carousel-item")
            if(imgCounter == 0) {
                imageCard.classList.add("active")
            }
            imageCard.innerHTML = `<img src="${image}" class="d-block w-100" alt="...">`;
            imageDiv.appendChild(imageCard)
        });
        



        console.log(selectedProduct);
        if (selectedProduct) {
            productDetails.innerHTML = `<h3>${selectedProduct.name}</h3><p>${selectedProduct.description}</p>`;
        } else {
            productDetails.innerHTML = '<p>Product not found</p>';
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        productDetails.innerHTML = '<p>Error fetching product data</p>';
    }
}

displayProductDetails();
