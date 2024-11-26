import { getProduct } from "./api/request.js";

const wrapper = document.querySelector(".wrapper");

let id = new URLSearchParams(window.location.search).get("id");

async function getCurrentPhone() {
    let { data } = await getProduct(id);
    let { brand, model, operatingSystem, year, price } = data;
    if (data) {
        wrapper.innerHTML = `
        <div class="col-md-6">
                <div class="card">
                    <img src="https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-11/iphone-11-white.jpg"
                        alt="">
                </div>
            </div>
            <div class="col-md-6 d-flex">
                <div class="card p-3 d-flex justify-content-between w-100">
                    <div>

                        <h1>${brand}</h1>
                        <h2>Model : ${model}</h2>
                        <p>Əməliyyat sistemi : ${operatingSystem}</p>
                        <p>Buraxılış ili : ${year}</p>

                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <h1>$${price}</h1>
                        <div>
                            <button class="btn btn-primary"> Səbətə əlavə et <i
                                    class="fa-solid fa-cart-shopping"></i></button>
                            <button class="btn btn-danger"> <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }


}

getCurrentPhone()



