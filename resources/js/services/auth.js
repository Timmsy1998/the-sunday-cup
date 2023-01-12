export class Auth {
    user() {
        return axios.get('/api/userinfo')
            .then(response => {
                return {
                    username: response.data.username,
                    summoner_name: response.data.summoner_name,
                    rank: response.data.rank,
                };
            })
    }
};
