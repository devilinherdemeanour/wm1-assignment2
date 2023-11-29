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
        
        console.log(selectedProduct);
        if (selectedProduct) {
            selectedProduct.images.forEach(image => {
                let imageCard = document.createElement('div')
                imageCard.classList.add("carousel-item")
                if(imgCounter == 0) {
                    imageCard.classList.add("active")
                }
                imageCard.innerHTML = `<img src="${image}" class="d-block w-100" alt="...">`;
                imageDiv.appendChild(imageCard)
            });
            productDetails.innerHTML = `
            <h3>Product name: ${selectedProduct.title}</h3>
            <p>Brand: ${selectedProduct.brand}</p>
            <p>Price: ${selectedProduct.price}$ <span class="discount">%${selectedProduct.discountPercentage} off</span></p>
            <p>Description: ${selectedProduct.description}</p>
            <p>Customer rating: ${selectedProduct.rating} / 5</p>
            <p>In stock: ${selectedProduct.stock}</p>
            `;
            
        } else {
            productDetails.innerHTML = '<p>Product not found</p>';
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        productDetails.innerHTML = '<p>Error fetching product data</p>';
    }
}

displayProductDetails();
