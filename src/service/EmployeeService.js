import apiClient from '../client/apiClient';

const EmployeeService = {

  async getEmployees(token) {
    const response = await apiClient.get('/api/v1/emp/employees', {headers: {Authorization: `Bearer ${token}`}} ,{withCredentials: true});
    return response;
  },

  async getEmployee(id, token){
    const response = await apiClient.get(`/api/v1/emp/employees/${id}`, {headers: {Authorization: `Bearer ${token}`}} ,{withCredentials: true})
    return response;
  },


  async createEmployees(payload, token){
    const response = await apiClient.post('/api/v1/emp/employees', payload, {headers: {Authorization: `Bearer ${token}`}} ,{withCredentials: true});
    return response;
  },

  async updateEmployees(id, payload, token){
    const response = await apiClient.put(`/api/v1/emp/employees/${id}`, payload, {headers: {Authorization: `Bearer ${token}`}} ,{withCredentials: true})
    return response;
  },

  async searchEmployees(query, token) {
    const response = await apiClient.get(`/api/v1/emp/search/${query}`, {headers: {Authorization: `Bearer ${token}`}} ,{withCredentials: true});
    return response;
  },

  async deleteEmployee(eid, token) {
    const response = await apiClient.delete(`/api/v1/emp/employees?eid=${eid}`, {headers: {Authorization: `Bearer ${token}`}} ,{withCredentials: true});
    return response.data;
  },

};

export default EmployeeService;
