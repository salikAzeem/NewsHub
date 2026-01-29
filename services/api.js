import axios from "axios";

const API_KEY = "afc7a7b5e624abf47164215e59b85dd8";

export const getNews = async () => {
  return await axios.get(
    `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${API_KEY}`
  );
};

// Search news
export const searchNews = async (query) => {
  return await axios.get(
    `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${API_KEY}`
  );
};
