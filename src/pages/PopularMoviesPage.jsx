import { useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import usePopularMovies from '../hooks/usePopularMovies'

const PopularMoviesPage = () => {
	const { data: popularMovies, error, isError, isLoading } = usePopularMovies()

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
			<h1 className="py-3">Current Popular Movies&nbsp;
							{
								popularMovies
									? `(${popularMovies.length})`
									: ''
							}</h1>

			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{popularMovies && <BasicTable columns={columns} data={popularMovies} />}
		</Container>
	)
}

export default PopularMoviesPage