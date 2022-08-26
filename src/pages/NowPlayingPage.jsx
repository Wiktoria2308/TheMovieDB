import { useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import BasicTable from '../components/BasicTable'
import useNowPlaying from '../hooks/useNowPlaying'

const NowPlayingPage = () => {

	const { data: nowPlaying, error, isError, isLoading } = useNowPlaying()

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
			<h1 className="py-3">Now Playing&nbsp;
							{
								nowPlaying
									? `(${nowPlaying.length})`
									: ''
							} </h1>

			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{nowPlaying && <BasicTable columns={columns} data={nowPlaying} />}
		</Container>
	)
}

export default NowPlayingPage
