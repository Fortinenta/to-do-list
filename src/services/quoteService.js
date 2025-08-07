import axios from 'axios';

const QUOTE_BASE_URL = 'https://api.quotable.io';

export const quoteService = {
  getDailyQuote: async () => {
    const response = await axios.get(`${QUOTE_BASE_URL}/random`, {
      params: {
        tags: 'motivational|success|wisdom',
        maxLength: 150
      }
    });
    return response.data;
  }
};
