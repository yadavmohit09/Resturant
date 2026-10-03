const API_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if(token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async request(endpoint, method = 'GET', data = null) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config = {
      method,
      headers
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Auth API
  login(email, password) {
    return this.request('/auth/login', 'POST', { email, password });
  }

  register(userData) {
    return this.request('/auth/register', 'POST', userData);
  }

  getMe() {
    return this.request('/auth/me');
  }

  // Menu API
  getMenu() {
    return this.request('/menu');
  }

  getCategories() {
    return this.request('/menu/categories');
  }

  // Order API
  createOrder(orderData) {
    return this.request('/orders', 'POST', orderData);
  }
}

const api = new ApiService();
