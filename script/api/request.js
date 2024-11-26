import { baseUrl } from "./baseUrj.js";

export async function getAllProducts() {
    let data = null;
    let error = null;

    await axios.get(baseUrl)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};


export async function getProduct(id) {
    let data = null;
    let error = null;

    await axios.get(baseUrl+id)
        .then(res => data = res.data)
        .catch(fatal => error = fatal)

    return { data, error }
};
