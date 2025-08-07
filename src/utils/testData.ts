// Utility to generate test registration data
// This helps create unique test accounts for development

export function generateTestRegistrationData() {
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 1000);
  
  return {
    professional_title: "Dr.",
    first_name: "Test",
    last_name: "Provider",
    email: `test.provider.${timestamp}@testhospital.com`,
    phone_number: `+1234567${String(randomId).padStart(3, '0')}`,
    username: `testprovider${timestamp}`,
    password: "TestPassword123!",
    password_confirm: "TestPassword123!",
    organization_facility: "Test General Hospital",
    professional_role: "Physician",
    specialization: "General Medicine",
    license_number: `MD${timestamp}${randomId}`,
    additional_information: "Test registration for development",
    years_of_experience: 5,
    consultation_fee: 150.00,
    bio: "Test provider account for development purposes"
  };
}

// Helper to fill form with test data
export function fillFormWithTestData() {
  const testData = generateTestRegistrationData();
  
  console.log('Generated test data:');
  console.log('Email:', testData.email);
  console.log('License:', testData.license_number);
  console.log('Phone:', testData.phone_number);
  console.log('Complete test data:', testData);
  
  return testData;
}

// Call this in browser console to get test data
// fillFormWithTestData()
