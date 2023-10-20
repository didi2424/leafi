import axios from 'axios';

const baseURL = 'http://192.168.1.32:3000'; // Replace with your API URL

const api = axios.create({
  baseURL,
});

export default api;

export const getDiseaseData = (diseaseName) => {
  // Define headers or any other configurations here if needed
  const headers = {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VuN0BnbWFpbC5jb20iLCJpYXQiOjE2OTUzOTU5MzEsImV4cCI6MTY5NTM5OTUzMX0.VRCbkvt2DdLPpqTNrwktlLSzLrRgj_AsgFOUOLbVmlk', // Example header for authorization
  };

  // Define query parameters
  const queryParams = {
    diseaseName,
  };

  // Make a GET request to retrieve disease data
  return api
    .get('/diseasesv1/diseasesdata', {
      params: queryParams,
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // Handle errors here as before
        if (error.response.status === 401) {
          console.log('Error 401: Unauthorized');
        } else if (error.response.status === 404) {
          console.log('Error 404: Not Found');
        } else {
          console.error('Error Response Data:', error.response.data);
        }
      }
    });
};

export const registerData = (email, password, roleid) => {
  const queryParams = {
    email,
    password,
    roleid,
  };
  return api
    .post('/Auth/register', queryParams)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    if (error.response) {
      if (error.response.status === 409) {
        console.log('Error 409: User Already Registered');
        throw new Error('User Already Registered but not activated'); // Throw an error for handling 409
      }
      } else {
        console.error('API call failed:', error);
        throw error; // Re-throw other errors for further handling, if needed
      }
    });

};

export const SendOTP = (email) => {
  const payload = {
    email,
  };
  return api
    .post('/Auth/sendotp', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 403) {
          console.log('OTP request limit exceeded. Please wait for the reset time');
          throw new Error('OTP request limit exceeded. Please wait for the reset time'); // Throw an error for handling
        } else {
          console.error('API call failed with status:', error.response.status);
          throw new Error('API call failed');
        }
      } else {
        console.error('API call failed:', error);
        throw error; // Re-throw other errors for further handling, if needed
      }
    });
};

export const VertifyOTP = (email,otp) => {
  const payload = {
    email,
    otp,
  };
  return api
    .post('/Auth/verifyotp', payload)
    .then(response => {
      if (response.status === 200) 
        console.log('otp same and update registered')
        onScreenChange(2);
        setInvailedOTP(false)
        })
    .catch(error => {
      if (error.response && error.response.status === 400) {
                console.log('Invailed OTP or Experied')
                throw new Error('OTP request limit exceeded. Please wait for the reset time'); // Throw an error for handling
    }}) 
};


