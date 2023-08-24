import { useMemo} from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import useTrendingMovies from '../hooks/useTrendingMovies'
import { useSearchParams } from 'react-router-dom'
import { Image } from "react-bootstrap";
import Pagination from "../components/Pagination";
import MovieImage from '../assets/images/movie.png'
import { useState, useEffect } from 'react'

const TrendingMoviesPage = () => {

    const [searchParams, setSearchParams] = useSearchParams({ page: 1 })
    const time = searchParams.get('time') ?? ''
	const [whatTime, setWhatTime] = useState(time);
	const page = searchParams.get("page")
	? Number(searchParams.get("page"))
	: null;

	useEffect(() => {
	setWhatTime(time)
	}, [time])

    const navigate = useNavigate()

    const { data: trending, error, isError, isLoading } = useTrendingMovies(whatTime, page)

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
		<Container className="py-5">
			<h4 className="text-uppercase mb-0">Trending Movies for the {time}</h4>

			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

            {trending &&
			<>
			<BasicTable columns={columns} data={trending.results} />
			<Pagination
              page={trending.page}
              numPages={
                trending.total_pages === 0 ? 1 : trending.total_pages
              }
              hasPreviousPage={trending.page === 1 ? false : true}
              hasNextPage={
                trending.page === trending.total_pages ? false : true
              }
              onPreviousPage={() => setSearchParams({ page: page - 1, time: whatTime })}
              onNextPage={() => setSearchParams({ page: page + 1, time: whatTime })}
            />
			</>
			}
		</Container>
	)
}

export default TrendingMoviesPage