import axios from 'axios';
import {Article} from '../types';
import {API_KEY} from '@env';

interface GuardianApiResponse {
  data: {
    response: {
      results: Article[];
    };
  };
}
const getArticles = async (page: number): Promise<Article[]> => {
  const articlesResponse: GuardianApiResponse = await axios.get(
    `https://content.guardianapis.com/search?api-key=${API_KEY}&page=${page}&show-fields=thumbnail,bodyText`,
  );

  return articlesResponse.data.response.results;
};

export {getArticles};
