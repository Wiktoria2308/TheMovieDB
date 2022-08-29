import { useNavigate, createSearchParams } from 'react-router-dom';


/**
 * navigate page to the page with your custom search params like query: query, page: page, time: time etc.
 * @returns 
 */
const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname, params) =>
      navigate({ pathname, search: `?${createSearchParams(params)}` });
};

export default useNavigateSearch