import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/products';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const productApi = {
  getAll: () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
  },

  create: async (newObject, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    for (const key in newObject) {
      formData.append(key, newObject[key]);
    }

    const config = {
      headers: { 
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post(baseUrl, formData, config);
    return response;
  },

  update: async (newObject, imageFile, id) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    for (const key in newObject) {
      formData.append(key, newObject[key]);
    }

    const config = {
      headers: { 
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.put(`${baseUrl}/${id}`, formData, config);
    console.log(response.status);
    return response;
  },

  setToken: setToken
};

export default productApi;
