import {baseURL, callAPIGet, callAPIPost} from "./APICore";

const authPrefix = "/auth/api/v1"
export async function loginUserAPI(username, password) {
    return await callAPIPost(authPrefix + "/login", {
        username, password
    });
}