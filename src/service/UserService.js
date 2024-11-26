import apiClient from '../client/apiClient'

 const UserService = {
    async signup(payload){
        const response = await apiClient.post('/api/v1/user/signup', payload);
        return response;
    },

    async login(payload){
        const response = await apiClient.post('/api/v1/user/login', payload);
        return response
    },

    async logout(){
        const response = await apiClient.get('/api/v1/user/logout')
        return response
    }
}

export default UserService