import ky from 'ky';

import AppState from '../AppState';
import * as RootNavigation from "../RootNavigation";

export const domain = "update.sineware.ca"
export const baseURL = "https://" + domain;
export const wsURL = "wss://" + domain + "/api/v1/gateway"

export async function callAPIGet(endpoint) {
    const json = await ky.get(baseURL + endpoint).json();
    console.log(json);
    return json;
}

export async function callAPIPost(endpoint, data) {
    const json = await ky.post(baseURL + endpoint, {json: data}).json();
    console.log(json);
    return json;
}

/* Websocket Gateway Connection */
export let gateway = null;
export async function connectWSGateway() {
    console.log("Attempting to connect to the WS Gateway...");
    AppState.setLoadingState(true, "Connecting to the WS Gateway...");

    gateway = new WebSocket(wsURL);
    //gateway = new WebSocket("ws://" + "localhost:3000" + "/api/v1/gateway");

    // todo handle reconnect
    gateway.onopen = () => {
        // Attempt Hello message
        console.log(AppState.cloudKey);
        gateway.send(JSON.stringify({
            "action":  "hello",
            "payload": {
                "type": "user",
                "token": AppState.cloudKey,
                "info":  {}
            }
        })); // send a message
    };

    gateway.onmessage = (e) => {
        // a message was received
        console.log(e.data);
        try {
            let msg = JSON.parse(e.data);
            console.log(msg);
            if(msg.payload.success) {
                switch (msg.action) {
                    case "hello-ack": {
                        console.log("Received hello-ack!");
                        //{"action":"hello-ack","payload":{"success":true,"id":"6825302769683174400","username":"test2","email":"admin@example.com6","fullname":"Seshan Ravikumar","displayname":"Seshan","statusmsg":null}}
                        AppState.userDetails = msg.payload;
                        setInterval(() => {
                            gateway.send(JSON.stringify({
                                action: "ping",
                                payload: {}
                            }))
                        }, 10000);

                        // Switch screen
                        RootNavigation.reset("MainScreen");
                        AppState.setLoadingState(false);
                    }

                }
            } else {

            }

        } catch (e) {
            console.error(e);
        }

    };

    gateway.onerror = (e) => {
        // an error occurred
        console.log("A gateway error occurred");
        console.log(e.message);
    };

    gateway.onclose = (e) => {
        // connection closed
        console.log("The geteway connection was closed")
        console.log(e.code, e.reason);
    };
}


