// Test script to check API endpoints
const API_BASE_URL = 'http://192.168.1.50:8000';

async function testDashboardEndpoint() {
  try {
    console.log('Testing dashboard endpoint...');
    
    // First, try to get a token (you'll need to replace with actual credentials)
    const loginResponse = await fetch(`${API_BASE_URL}/api/v1/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'dr.joseph.ewool.1754558681@testhospital.com',
        password: 'test123' // Replace with actual password
      })
    });
    
    console.log('Login response status:', loginResponse.status);
    const loginData = await loginResponse.json();
    console.log('Login data:', loginData);
    
    if (loginData.access) {
      // Now test dashboard endpoint
      const dashboardResponse = await fetch(`${API_BASE_URL}/api/v1/auth/provider/dashboard/`, {
        headers: {
          'Authorization': `Bearer ${loginData.access}`,
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Dashboard response status:', dashboardResponse.status);
      const dashboardData = await dashboardResponse.json();
      console.log('Dashboard data structure:', dashboardData);
      
      // Check what fields are actually returned
      if (dashboardData.stats) {
        console.log('Stats structure:', Object.keys(dashboardData.stats));
      }
      if (dashboardData.statistics) {
        console.log('Statistics structure:', Object.keys(dashboardData.statistics));
      }
    }
    
  } catch (error) {
    console.error('API test failed:', error);
  }
}

// testDashboardEndpoint();
console.log('Test script loaded. Call testDashboardEndpoint() to run the test.');
