const products = document.getElementById("products")

let productsResponse = {};
let categoriesResponse = {};

fetch('https://dummyjson.com/products?limit=10')
.then(res => res.json())
.then(json => {
    if(json && json.message) {
        alert(json.message);
    } else {
        json.products.forEach(element => {
            let mainCard = document.createElement('div')
            mainCard.classList.add("card")
            mainCard.classList.add("col-5")
            mainCard.innerHTML = `<img src="${element.thumbnail}" class="card-img-top" alt="product photo">`

            let cardBody = document.createElement('div')
            cardBody.classList.add("card-body")
            
            let cardTitle = document.createElement('h5')
            cardTitle.classList.add("card-title")
            cardTitle.innerHTML = `${element.title}`
            
            let cardText = document.createElement('p')
            cardText.classList.add("card-text")
            cardText.innerHTML = `Price: ${element.price}$ <span class="discount">${element.discountPercentage}</span> <br> Stock size: ${element.stock} `
            
            let moreInfo = document.createElement('a')
            moreInfo.classList.add("btn")
            moreInfo.classList.add("btn-primary")
            moreInfo.innerHTML = `Learn more about Product`

            cardBody.appendChild(cardTitle)
            cardBody.appendChild(cardText)
            cardBody.appendChild(moreInfo)
            mainCard.appendChild(cardBody)

            products.appendChild(mainCard)

            mainCard.addEventListener('click', () => {
                window.location.href = `product.html?id=${element.id}`;
            });


            
            // priceAndDiscount.innerHTML = `${element.price}$ <span>${element.discountPercentage}%</span> `
            // let categoryOfProduct = document.createElement('h2')
            // categoryOfProduct.innerHTML = `Category: ${element.category}`
            // let stockSize = document.createElement('h3')
            // stockSize.innerHTML = `Stock size: ${element.stock}`
            // products.appendChild(titleAndThumbnail)
            // products.appendChild(priceAndDiscount)
            // products.appendChild(categoryOfProduct)
            // products.appendChild(stockSize)
        });
        productsResponse = json;
        console.log(json);
    }
})
            
