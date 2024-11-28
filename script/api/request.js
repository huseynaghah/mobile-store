import { baseUrl } from "./baseUrj.js";

export async function getAllProducts() {
    let data = null;
    let error = null;

    await axios.get(baseUrl.products)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};


export async function getProduct(id) {
    let data = null;
    let error = null;

    await axios.get(baseUrl.products + id)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};

export async function getAllUsers() {
    let data = null;
    let error = null;

    await axios.get(baseUrl.users)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error };
}

export async function createUser(userdata) {

    let data = null;
    let error = null;

    await axios.post(baseUrl.users, userdata)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
}


export async function getCurrentUser(id) {

    let data = null;
    let error = null;

    await axios.get(baseUrl.users + id)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
}

export async function addFavorite(id, productData) {

    let data = null;
    let error = null;

    await axios.patch(baseUrl.users + id , productData)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
}

