import { useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import useMoviesByGenre from '../hooks/useMoviesByGenre'
import { useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { useSearchParams } from 'react-router-dom'

const MoviesByGenrePage = () => {
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 })
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : null
    const { id } = useParams()
	const { data: moviesByGenre, error, isError, isLoading } = useMoviesByGenre(id, page)

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
			<h1 className="py-3">Movies by genre</h1>

			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{moviesByGenre && (
				<>
					<BasicTable columns={columns} data={moviesByGenre.results} />
					<Pagination
							page={moviesByGenre.page}
							numPages={Math.ceil(moviesByGenre.total_pages / 10)}
							hasPreviousPage={moviesByGenre.page === 1 ? false : true}
							hasNextPage={moviesByGenre.page === moviesByGenre.total_pages ? false : true}
							onPreviousPage={() => setSearchParams({ page: page - 1})}
							onNextPage={() => setSearchParams({ page: page + 1})}
			         />
				</>
			)}
			
		</Container>
	)
}

export default MoviesByGenrePage