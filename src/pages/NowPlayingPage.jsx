import { useEffect, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import useMovies from '../hooks/useMovies'
import { Image } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import MovieImage from '../assets/images/movie.png'

const NowPlayingPage = () => {
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
	const page = searchParams.get("page")
	  ? Number(searchParams.get("page"))
	  : 1;

	const { data: nowPlaying, error, isError, isLoading } = useMovies("now_playing", page)

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
			},
			{
				accessor: 'release_date',
			},
		]
	}, [])

	return (
		<Container className="py-5" style={{minHeight: '100vh'}}>
			<h4 className="text-uppercase mb-0">Now Playing</h4>

			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{nowPlaying && 
			<>
			<BasicTable columns={columns} data={nowPlaying.results} />
			<Pagination
              page={nowPlaying.page}
              numPages={
                nowPlaying.total_pages === 0 ? 1 : nowPlaying.total_pages
              }
              hasPreviousPage={nowPlaying.page === 1 ? false : true}
              hasNextPage={
                nowPlaying.page === nowPlaying.total_pages ? false : true
              }
              onPreviousPage={() => setSearchParams({ page: page - 1 })}
              onNextPage={() => setSearchParams({ page: page + 1 })}
            />
			</>
			}
		</Container>
	)
}

export default NowPlayingPage
