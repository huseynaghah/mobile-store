import { getAllProducts } from "./api/request.js";
const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("#searchInput");
const sortForAny = document.querySelector("#sortForAny");
let allPhone = [];

async function getAllData() {
    let res = await getAllProducts();
    allPhone = res.data;

    render(allPhone);

}

function render(array) {
    wrapper.innerHTML = "";
    array.forEach(({ id, brand, model, price }) => {
        wrapper.innerHTML += `
             <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card" data-id=${id}>
                        <img src="https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-11/iphone-11-white.jpg" class="card-img-top" alt="iphone">
                        <div class="card-body">
                          <h5 class="card-title">${brand} , ${model}</h5>
                          <p class="card-text">$${price}</p>
                          <div class="d-flex justify-content-end">
                            <button class="addToFavorites btn btn-danger mx-1"><i class="fa-regular fa-heart"></i></button>
                            <button class="addToBasket btn btn-warning"><i class="fa-solid fa-cart-shopping"></i></button>
                          </div>
                        </div>
                      </div>
                </div> 
        `
    })

    document.querySelectorAll(".card").forEach(cardElement => {
        cardElement.addEventListener('click', (e) => {
            window.location = "./detail.html?id=" + cardElement.dataset.id;
        })
    })

    document.querySelectorAll(".addToFavorites").forEach((favBtn) => {
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();


        })
    })

    document.querySelectorAll(".addToBasket").forEach((basketBtn) => {
        basketBtn.addEventListener('click', (e) => {
            e.stopPropagation();


        })
    })

}

searchInput.addEventListener("input", (e) => {

    let filteredData = allPhone.filter(({ model }) => model.toLowerCase().startsWith(e.target.value.trim().toLowerCase()));
    render(filteredData);

})

sortForAny.addEventListener("change", (e) => {
    console.log(e.target.value);

    let sortedData;

    switch (e.target.value) {
        case "alphabetically-asc":
            sortedData = allPhone.toSorted((a, b) => a.model.localeCompare(b.model))
            break;
        case "alphabetically-des":
            sortedData = allPhone.toSorted((a, b) => b.model.localeCompare(a.model))
            break;
        case "cheap-first":
            sortedData = allPhone.toSorted((a, b) => a.price - b.price)
            break;
        case "exp-first":
            sortedData = allPhone.toSorted((a, b) => b.price - a.price)
            break;
        default :
            sortedData = [...allPhone];
    }



   render(sortedData);


})

getAllData();
