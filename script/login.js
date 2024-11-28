import { getAllUsers ,getCurrentUser} from "./api/request.js";
import { User } from "./user.js";

const loginForm = document.querySelector("#loginForm");
const usernameInp = document.querySelector("#usernameInp");
const passwordInp = document.querySelector("#passwordInp");

let currentUserId = localStorage.getItem("currentUserId") || null;
let currentUser = null;

if (currentUserId) {
    getCurrentUser(currentUserId)
        .then(res => {
            currentUser = res.data;

            if (currentUser) {
               window.location = "./index.html";
            } else {
                localStorage.removeItem('currentUserId');
            }


        })
        .catch((error) => {
            console.log(error);
        })

}



loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    let response =  await getAllUsers();
    let userlist = response.data;

    let targetUser = userlist.find((user)=> user.username == usernameInp.value);
    if (!targetUser) {
        alert("User not exist!");
        return;
    }

    if (targetUser.password != passwordInp.value) {
        alert("Password is not true");
        return;
    }

    
    localStorage.setItem("currentUserId", targetUser.id)
    alert("Login successfully");
    window.location = "./"

})