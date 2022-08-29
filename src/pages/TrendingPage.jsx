
import useNavigateSearch from '../hooks/useNavigateSearch'

const TrendingPage = () => {

    // use navigate search to navigate to selected page 
    const navigateSearch = useNavigateSearch();

    // here send time as day or week to navigate to selected page like: trending-movies/day
	const handleClick = async(time) => {
		navigateSearch('trending-movies', {time})
	}

	return (
        
		<div className="py-3 trending-time-container">
			<h1 className="py-3">Trending Movies</h1>
		    <h2 className='mb-3'>Select time:</h2>
            <ul className='time-trending-list'>
                <li onClick={() => handleClick('day')}>
                    Daily trending movies
                </li>
                <li onClick={() => handleClick('week')}>
                    Weekly trending movies
                </li>
            </ul>
			
		</div>
	)
}

export default TrendingPage