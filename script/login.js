import { getAllUsers} from "./api/request.js";
import { User } from "./user.js";

const loginForm = document.querySelector("#loginForm");
const usernameInp = document.querySelector("#usernameInp");
const passwordInp = document.querySelector("#passwordInp");


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

    alert("Login successfully");
    localStorage.setItem("currentUserId", targetUser.id)


})