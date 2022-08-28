import { useMemo} from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import useTrendingMovies from '../hooks/useTrendingMovies'
import { useSearchParams } from 'react-router-dom'

const TrendingMoviesPage = () => {

    const [searchParams] = useSearchParams({})
    const time = searchParams.get('time') ?? ''

    const navigate = useNavigate()

    const { data: trending, error, isError, isLoading } = useTrendingMovies(time)

	const columns = useMemo(() => {
		return [
			{
				Header: 'Movie Title',
				accessor: 'title',
			},
			{
				Header: 'Release Date',
				accessor: 'release_date',
			},
			{
				Header: 'Read more',
				Cell: ({ row: { original: movie } }) => (
					<Button
						variant="primary"
						size="sm"
						as={Link}
						to={`/movies/${movie.id}`}
					>
						Show
					</Button>
				)
			},
		]
	}, [])

	return (
		<Container className="py-3">
			<h1 className="py-3">Trending Movies for the {time}...</h1>

			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

            {trending && <BasicTable columns={columns} data={trending.results} />}

            <Button variant="primary" onClick={() => navigate(-1)}>&laquo; Back</Button>
			
		</Container>
	)
}

export default TrendingMoviesPage