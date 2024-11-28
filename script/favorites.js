import { getAllProducts, getCurrentUser } from "./api/request.js";
import { render, renderNavbar } from "./main.js";
const wrapper = document.querySelector(".wrapper");

let allPhone = [];
let favPhones = [];
let currentUserId = localStorage.getItem("currentUserId") || null;
let currentUser = null;

if (currentUserId) {
    getCurrentUser(currentUserId)
        .then(res => {
            currentUser = res.data;

            if (currentUser) {
                renderNavbar();
                getAllProducts()
                    .then(res => {
                        allPhone = res.data;
                        currentUser.favorites.forEach(favPh => {


                            favPhones.push(allPhone.find(phone => phone.id == favPh))
                        })
                        console.log(favPhones);
                        
                        render(favPhones)

                    })


            } else {
                localStorage.removeItem('currentUserId');
            }


        })
        .catch((error) => {
            console.log(error);
        })

}
