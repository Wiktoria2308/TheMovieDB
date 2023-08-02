
import Container from 'react-bootstrap/Container'
import { useMemo } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import { useSearchParams } from 'react-router-dom'
import useSearchMovies from '../hooks/useSearchMovies'
import Pagination from '../components/Pagination'
import MovieImage from '../assets/images/movie.png'
import { Image } from "react-bootstrap";

const SearchPage = () => {

	const [searchParams, setSearchParams] = useSearchParams({ page: 1 })
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : null
	const query = searchParams.get('query') ?? ''

	const { data: moviesSearch, error, isError, isLoading, isSuccess } = useSearchMovies(query, page)

	const columns = useMemo(() => {
		return [
			{
				Header: "Photo",
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
				Header: 'Movie Title',
				accessor: 'title',
			},
			{
				Header: 'Release Date',
				accessor: 'release_date',
			},
		]
	}, [])

	return (
		<Container className="py-3">


			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{isSuccess && moviesSearch.results && (

				<>
					{query && (<h1 className="py-3">Search results for: '{query}'...</h1>)}
					<BasicTable columns={columns} data={moviesSearch.results} />
					<Pagination
						page={moviesSearch.page}
						numPages={moviesSearch.total_pages === 0 ? 1 : moviesSearch.total_pages}
						hasPreviousPage={moviesSearch.page === 1 ? false : true}
						hasNextPage={moviesSearch.page === moviesSearch.total_pages ? false : true}
						onPreviousPage={() => setSearchParams({ query: query, page: page - 1 })}
						onNextPage={() => setSearchParams({ query: query, page: page + 1 })}
					/>
				</>
			)}
		</Container>
	)
}

export default SearchPage
