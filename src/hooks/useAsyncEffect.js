import { useEffect, useState } from 'react';

const useAsyncEffect = (asyncFunction, dependencies) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    asyncFunction()
      .then((data) => setState({ loading: false, error: null, data }))
      .catch((error) => setState({ loading: false, error, data: null }));
  }, dependencies);

  return state;
};
export default useAsyncEffect;
