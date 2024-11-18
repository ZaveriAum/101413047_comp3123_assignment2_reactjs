import apiClient from '../client/apiClient';

const EmployeeService = {

  async getEmployees() {
    const response = await apiClient.get('/api/v1/emp/employees');
    return response;
  },

  async getEmployee(id){
    const response = await apiClient.get(`/api/v1/emp/employees/${id}`)
    return response;
  },


  async createEmployees(payload){
    const response = await apiClient.post('/api/v1/emp/employees', payload);
    return response;
  },

  async updateEmployees(id, payload){
    const response = await apiClient.put(`/api/v1/emp/employees/${id}`, payload)
    return response;
  },

  async searchEmployees(query) {
    const response = await apiClient.get(`/api/v1/emp/search/${query}`);
    return response;
  },

  async deleteEmployee(eid) {
    const response = await apiClient.delete(`/api/v1/emp/employees?eid=${eid}`);
    return response.data;
  },

};

export default EmployeeService;
