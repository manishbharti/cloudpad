export function convertObjectToArray(data) {
    if (!data) {
        return [];
    }

    return Object.keys(data).map(function (k) {
        return data[k]
    });
}

export function wrapText(text, characterLimit) {
    return text.length > characterLimit ? text.substring(0, characterLimit) + "..." : text;
}

export function validateRegistrationForm(user) {
    if (user.fn === "") {
        return "First name cannot be blank!";
    }

    if (user.email === "") {
        return "Email cannot be blank!";
    }

    if (user.pw === "" || user.cpw === "") {
        return "Password and confirm password cannot be blank!"
    }

    if (user.pw === user.email) {
        return "Password must be different from email!";
    }

    if (user.pw !== user.cpw) {
        return "Passwords do not match!";
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(user.pw)) {
        return "Password must contain at least one number(0-9), one lowercase(a-z) and one uppercase(A-Z) letter and six characters!";
    }

    if (!user.captchaVerified) {
        return "Please verify captcha."
    }

    return null;
}
