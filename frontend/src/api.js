const API_BASE_URL = '/api/v1';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    // For OAuth2PasswordRequestForm, we need to send as form data
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await this.request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });
    
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    
    return response;
  }

  async logout() {
    this.clearToken();
  }

  // Tabular prediction endpoints
  async predictTabular(data) {
    return this.request('/predict/tabular', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ECG prediction endpoints
  async predictEcg(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/predict/ecg', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary
      },
      body: formData,
    });
  }

  // History endpoints
  async getHistory(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = `/history${queryParams ? `?${queryParams}` : ''}`;
    return this.request(url);
  }

  async getPredictionDetail(predictionId) {
    return this.request(`/history/${predictionId}`);
  }
}

// Export singleton instance
const apiService = new ApiService();

export default apiService;