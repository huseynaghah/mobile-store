import { addFavorite, getAllProducts, getCurrentUser } from "./api/request.js";
const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("#searchInput");
const sortForAny = document.querySelector("#sortForAny");
const buttonsWrapper = document.querySelector(".buttons");
let allPhone = [];

let currentUserId = localStorage.getItem("currentUserId") || null;
let currentUser = null;

if (currentUserId) {
    getCurrentUser(currentUserId)
        .then(res => {
            currentUser = res.data;

            if (currentUser) {

                renderNavbar();

                document.querySelector('#logOut').addEventListener('click', () => {
                    localStorage.removeItem('currentUserId');
                    window.location.reload();
                })
            } else {
                localStorage.removeItem('currentUserId')
            }

            getAllData();


        })
        .catch((error) => {
            console.log(error);
        })



} else {
    getAllData();
}

export const renderNavbar = () => {
    buttonsWrapper.innerHTML = `
    <h3 class="mx-1">Welcome , <span id="namekeep">${currentUser.username}</span> !</h3> 
          <a href="./favorites.html">
            <button class="btn btn-outline-danger position-relative">
                <i class="fa-regular fa-heart"></i>
                    Favorites
               ${currentUser.favorites.length != 0 ? ` <span class="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">${currentUser.favorites.length}</span>` : ""}
            </button>
            </a>
          <a href="./basket.html"><button class="btn btn-outline-warning mx-2"><i class="fa-solid fa-cart-shopping"></i>Cart</button>
          </a>
          <button class="btn btn-primary" id="logOut">Log out</button>
  `
}


async function getAllData() {
    let res = await getAllProducts();
    allPhone = res.data;

    render(allPhone);

}

export function render(array) {
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
                            <button class="addToFavorites btn ${currentUser?.favorites?.includes(id) ? "btn-danger " : "btn-outline-danger"} mx-1"><i class="fa-regular fa-heart"></i></button>
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
            if (!currentUser) {
                alert("You are not signed in!");
                return;
            }
            let favProductId = e.target.closest(".card").dataset.id;

            if (!currentUser.favorites.includes(Number(favProductId))) {
                currentUser.favorites.push(Number(favProductId));
            } else {
                let index = currentUser.favorites.indexOf(Number(favProductId));
                currentUser.favorites.splice(index, 1);
            }


            renderNavbar();
            addFavorite(currentUserId, currentUser).then(res => render(allPhone))




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
        default:
            sortedData = [...allPhone];
    }



    render(sortedData);


})

getAllData();
