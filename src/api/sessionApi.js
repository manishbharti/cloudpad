import jquery from "jquery";

import {LOGIN_URL} from "../constants";

export const login = (user) => {
    let serverResponse;
    jquery.ajax({
        url: LOGIN_URL,
        type: "POST",
        crossDomain: true,
        data: JSON.stringify({"username": user.email, "password": user.password}),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        async: false,
        success: function (response) {
            serverResponse = {
                token: response.token_type + " " + response.access_token,
                data: {
                    email: response.username,
                    roles: response.roles
                }
            };
        },
        error: function (xhr, status) {
            if (xhr.status === 401) {
                alert("Invalid username or password.");
            } else {
                alert("Something went wrong. Please try again later.");
            }
        }
    });

    return new Promise(resolve => setTimeout(resolve(serverResponse), 1000));
};

export const logout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};
