import { useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import useMoviesByGenre from '../hooks/useMoviesByGenre'
import { useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { useSearchParams } from 'react-router-dom'
import { Image } from "react-bootstrap";

const MoviesByGenrePage = () => {
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 })
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : null
    const { id, name } = useParams()
	const { data: moviesByGenre, error, isError, isLoading } = useMoviesByGenre(id, page)

	const columns = useMemo(() => {
		return [
			{
				accessor: "poster_path",
				Cell: (tableProps) => (
					<a href={`/movies/${tableProps.row.original.id}`}>
					<Image
						src={tableProps.row.original.poster_path === null ? MovieImage :  `https://image.tmdb.org/t/p/w500${tableProps.row.original.poster_path}` }
						alt="Movie poster"
						width={100}
					/>
					</a>
				),
			},
			{
				accessor: 'title',
				Cell: (tableProps) => {
					return (
					  <div className="result-title-container" style={{ width: '15rem' }}>
						<p className="result-title mb-1">{tableProps.value}</p>
						<p className="result-title-date">{tableProps.row.original.release_date ? tableProps.row.original.release_date.substring(0, 4) : null }</p>
					  </div>
					);
				  },
			},
		]
	}, [])

	return (
		<Container className="py-5">
			<h4 className="text-uppercase mb-0">{name} movies</h4>

			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{moviesByGenre && (
				<>
					<BasicTable columns={columns} data={moviesByGenre.results} />
					<Pagination
							page={moviesByGenre.page}
							numPages={moviesByGenre.total_pages === 0 ? 1 : moviesByGenre.total_pages}
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