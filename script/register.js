import { getAllUsers, createUser } from "./api/request.js";
import { User } from "./user.js";

const registerForm = document.querySelector("#registerForm");

const emailInp = document.querySelector("#emailInp");
const usernameInp = document.querySelector("#usernameInp");
const passwordInp = document.querySelector("#passwordInp");


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let response = await getAllUsers();
    let userlist = response.data;

    let newUser = new User(emailInp.value, usernameInp.value, passwordInp.value);
    // let newUser = {
    //     email : emailInp.value,
    //     username : usernameInp.value,
    //     password : passwordInp.value
    // }


    let isUserExist = userlist.find((user) => user.email == newUser.email || user.username == newUser.username);

    if (isUserExist) {
        alert("User already existed!");

        return;
    }


    try {
        await createUser(newUser);
        alert("User successfully created");

        window.location = "./login.html"
    } catch (error) {
        console.log(error);

    }







})