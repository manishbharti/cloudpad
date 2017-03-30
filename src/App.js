let UserData = {
    user: {
        username: '',
        token_type: '',
        access_token: '',
        role: []
    },
    getAccessToken: function () {
        if (this.user.token_type !== '' || this.user.access_token !== '') {
            // 'Bearer ' + accessToken
            return this.user.token_type + " " + this.user.access_token;
        } else {
            return '';
        }
    },
    setUserData: function (user) {
        this.user.username = user.username;
        this.user.token_type = user.token_type;
        this.user.access_token = user.access_token;
        this.user.roles = user.roles;
    },
    isLoggedin: function () {
        return this.getAccessToken() !== '';
    }
};

export {UserData};