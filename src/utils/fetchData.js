import axios from 'axios';

import { base_url } from 'utils/baseurl';

export const fetchData = async (url) => {
    const response = await axios.get(`${base_url}/${url}`);
    return response.data.data;
  }