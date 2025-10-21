const apiService = {
  baseUrl: 'http://localhost:8000/api/v1',
  token: null,

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
  },

  async login(credentials) {
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
      this.token = response.access_token;
    }
    
    return response;
  },

  async getHistory() {
    return this.request('/history/');
  }
};

async function testConnection() {
  try {
    console.log('Testing frontend to backend connection...');
    
    // Test login
    console.log('Attempting login...');
    const loginResponse = await apiService.login({
      username: 'testuser',
      password: 'testpassword'
    });
    console.log('Login successful!', loginResponse);
    
    // Test history retrieval
    console.log('Fetching prediction history...');
    const historyResponse = await apiService.getHistory();
    console.log('History retrieved successfully!', historyResponse);
    
    console.log('Frontend-backend connection test PASSED!');
  } catch (error) {
    console.error('Frontend-backend connection test FAILED:', error);
  }
}

testConnection();
