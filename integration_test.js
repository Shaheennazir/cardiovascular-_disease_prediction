// Integration test to verify frontend-backend connection
const fs = require('fs');

// Test data
const testUserData = {
  username: 'testuser',
  password: 'testpassword'
};

const testTabularData = {
  age: 45,
  gender: 1,
  height: 170,
  weight: 70,
  ap_hi: 120,
  ap_lo: 80,
  cholesterol: 1,
  gluc: 1,
  smoke: 0,
  alco: 0,
  active: 1
};

console.log('Starting integration test...');

// Test 1: Backend health check
console.log('\n1. Testing backend health check...');
fetch('http://localhost:8000/health')
  .then(response => {
    if (response.ok) {
      console.log('✓ Backend is healthy');
      return response.json();
    } else {
      throw new Error(`Backend health check failed with status ${response.status}`);
    }
  })
  .then(data => {
    console.log('  Health check response:', data);
    
    // Test 2: User authentication
    console.log('\n2. Testing user authentication...');
    return fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${testUserData.username}&password=${testUserData.password}`
    });
  })
  .then(response => {
    if (response.ok) {
      console.log('✓ User authentication successful');
      return response.json();
    } else {
      throw new Error(`Authentication failed with status ${response.status}`);
    }
  })
  .then(data => {
    const token = data.access_token;
    console.log('  Token received');
    
    // Test 3: Tabular prediction
    console.log('\n3. Testing tabular prediction...');
    return fetch('http://localhost:8000/api/v1/predict/tabular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testTabularData)
    })
    .then(response => {
      if (response.ok) {
        console.log('✓ Tabular prediction successful');
        return response.json();
      } else {
        throw new Error(`Tabular prediction failed with status ${response.status}`);
      }
    })
    .then(data => {
      console.log('  Prediction result:', data);
      
      // Test 4: Prediction history
      console.log('\n4. Testing prediction history...');
      return fetch('http://localhost:8000/api/v1/history/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    })
    .then(response => {
      if (response.ok) {
        console.log('✓ Prediction history retrieval successful');
        return response.json();
      } else {
        throw new Error(`Prediction history retrieval failed with status ${response.status}`);
      }
    })
    .then(data => {
      console.log('  History records found:', data.total);
      console.log('  Sample record:', data.predictions[0]);
      
      // Test 5: Create a test ECG file and test ECG prediction
      console.log('\n5. Testing ECG prediction...');
      // Create a small test file
      const testFileContent = 'TEST_ECG_DATA_CONTENT';
      fs.writeFileSync('test_ecg_integration.dat', testFileContent);
      
      // Note: In a real test, we would send the actual ECG file
      console.log('  Skipping ECG prediction test (requires valid ECG file)');
      console.log('  To test ECG prediction, upload a valid .dat file through the frontend');
      
      // Clean up test file
      fs.unlinkSync('test_ecg_integration.dat');
      
      console.log('\n=== Integration Test Summary ===');
      console.log('✓ Backend health check: PASSED');
      console.log('✓ User authentication: PASSED');
      console.log('✓ Tabular prediction: PASSED');
      console.log('✓ Prediction history: PASSED');
      console.log('ℹ ECG prediction: SKIPPED (requires valid ECG file)');
      console.log('\nAll critical integration tests PASSED!');
    });
  })
  .catch(error => {
    console.error('Integration test failed:', error.message);
  });