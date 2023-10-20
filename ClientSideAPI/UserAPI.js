import axios from 'axios';

const baseURL = 'http://192.168.1.32:3000'; // Replace with your API URL

const api = axios.create({
  baseURL,
});

export const GetUser = (token) => {
    const headers = {
      Authorization: `${token}`,
    };
    return api
    .get(`/Auth/users`, { headers: headers })
      .then(response => {
        if (response.status === 200) {
          console.log('User data:', response.data);
          return response.data; // You can return the user data if needed
        } else if (response.status === 403) {
          console.error('Firstname and lastname are required');
          throw new Error('Firstname and lastname are required');
        } else if (response.status === 401) {
          console.error('Unauthorized');
          throw new Error('Unauthorized');
        } else if (response.status === 404) {
          console.error('User not found');
          throw new Error('User not found');
        } else { 
          console.error('Failed to fetch user data');
          throw new Error('Failed to fetch user data');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        throw error; // Propagate the error for handling at the higher level
      });
  };
  
  export const UpdateUser = (firstname, lastname, token) => {
    const headers = {
      Authorization: `${token}`,
    };
    console.log(firstname,lastname)
    const payload = {
        firstname: firstname,
        lastname: lastname,
      };
    return api
    .put(`/Auth/users`, payload, { headers: headers })
      .then(response => {
        if (response.status === 200) {
          console.log('User data:', response.data);
          return response.data; // You can return the user data if needed
        } else if (response.status === 401) {
          console.error('Unauthorized');
          throw new Error('Unauthorized');
        } else if (response.status === 403) {
          console.error('Firstname and lastname are required');
          throw new Error('Firstname and lastname are required');
        } else if (response.status === 404) {
          console.error('User not found');
          throw new Error('User not found');
        } else if (response.status === 500) {
            console.error('Failed to update user profile');
            throw new Error('Failed to update user profile');
        } else { 
          console.error('Failed to fetch user data');
          throw new Error('Failed to fetch user data');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        throw error; // Propagate the error for handling at the higher level
      });
  };
  
  export const GetUserActivity =  (token) => {
    const headers = {
      Authorization: `${token}`,
    };
    return api
      .get(`/Auth/useractivity`, { headers: headers })
      .then((response) => {
        return response.data;
        
      })
      .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('ActivityNull'); // Throw an error for handling 409
        }
        else if (response.status === 200) {
          console.error('User not found');
          throw new Error('User not found');
        } 
        } else {
          console.error('API call failed:', error);
          throw error; // Re-throw other errors for further handling, if needed
        }
      });
  
  };