import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/photos';
const ACCESS_KEY = 'rkcVhVCZfLEaTGKdJar6pLrHvR9QC9Mn2a6R8Yk7I1g';
const headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`
};

const PER_PAGE = 10;

export const getImages = async (page = 0) => {
  try {
    const imagesList = await axios.get(`${BASE_URL}`, {
      params: {
        page: page,
        per_page: PER_PAGE
      },
      headers: headers
    });

    return imagesList;
  } catch(err) {
    throw err;
  }
};

export const getImage = async (url) => {
  try {
    return await axios.get(url, { headers: headers });
  } catch(err) {
    throw err;
  }
};

