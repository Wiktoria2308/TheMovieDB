import Container from 'react-bootstrap/Container'
import useNavigateSearch from '../hooks/useNavigateSearch'

const TrendingPage = () => {

    const navigateSearch = useNavigateSearch();

	const handleClick = async(time) => {
		navigateSearch('trending-movies', {time})
	}

	return (
		<Container className="py-3">
			<h1 className="py-3">Trending Movies</h1>
		    <p>Select time:</p>
            <ul>
                <li onClick={() => handleClick('day')}>
                    Daily trending movies
                </li>
                <li onClick={() => handleClick('week')}>
                    Weekly trending movies
                </li>
            </ul>
			
		</Container>
	)
}

export default TrendingPage