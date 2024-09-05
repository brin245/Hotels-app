import axios from 'axios';
import { useState } from 'react';

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => setResponse(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return [response, getData, isLoading];
};

export default useFetch;
