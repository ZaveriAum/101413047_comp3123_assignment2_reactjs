import apiClient from '../client/apiClient'

 const UserService = {
    async signup(payload){
        const response = await apiClient.post('/api/v1/user/signup', payload);
        return response;
    },

    async login(payload){
        const response = await apiClient.post('/api/v1/user/login', payload, {withCredentials:true});
        localStorage.setItem("token", response.data.token)
        return response
    },

}

export default UserService