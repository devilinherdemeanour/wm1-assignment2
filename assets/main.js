const products = document.getElementById("products");
const spinner = document.getElementById("spinner");
spinner.hidden = true;
products.hidden = true;

let productsResponse = {};
let categoriesResponse = {};
let skip = 0;
let baseUrl = "https://dummyjson.com/products";

let categoryFilter = document.getElementById("categoryFilter");
let searchFilter = document.getElementById("searchFilter");

categoryFilter.addEventListener("change", function () {
  let selectedValue = categoryFilter.value;
  getData(selectedValue, undefined);
});
searchFilter.addEventListener("change", function () {
  let selectedValue = searchFilter.value;
  getData(undefined, selectedValue);
});

getData(undefined, undefined);
getCategories();

function getData(category, keyword) {
  spinner.hidden = false;
  products.innerHTML = "";
  let url = baseUrl;
  if (category) {
    url = url + `/category/${category}`;
  } else if (keyword) {
    url = url + `/search?q=${keyword}`;
  }
  fetch(`${url}`)
    .then((res) => res.json())
    .then((json) => {
      if (json && json.message) {
        alert(json.message);
      } else {
        json.products.forEach((element) => {
          let mainCard = document.createElement("div");
          mainCard.classList.add("card");
          mainCard.classList.add("col-5");
          mainCard.innerHTML = `<img src="${element.thumbnail}" class="card-img-top" alt="product photo">`;

          let cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          let cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.innerHTML = `${element.title}`;

          let cardText = document.createElement("p");
          cardText.classList.add("card-text");
          cardText.innerHTML = `Price: ${element.price}$ <span class="discount">%${element.discountPercentage}</span> <br> Stock size: ${element.stock} `;

          let moreInfo = document.createElement("a");
          moreInfo.classList.add("btn");
          moreInfo.classList.add("btn-primary");
          moreInfo.innerHTML = `Learn more about Product`;

          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardText);
          cardBody.appendChild(moreInfo);
          mainCard.appendChild(cardBody);

          products.appendChild(mainCard);

          moreInfo.addEventListener("click", () => {
            window.location.href = `product.html?id=${element.id}`;
          });
        });
        products.hidden = false;
        spinner.hidden = true;
        productsResponse = json;
        console.log(json);
      }
    });
}

function getCategories() {
  fetch("https://dummyjson.com/products/categories")
    .then((res) => res.json())
    .then((json) => {
      categoriesResponse = json;
      categoriesResponse.forEach((element) => {
        let option = document.createElement("option");

        option.value = element;
        option.innerHTML = element;

        categoryFilter.appendChild(option);
      });
    });
}
