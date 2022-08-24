import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import './assets/scss/App.scss'
import NowPlayingPage from './pages/NowPlayingPage'
import PopularMoviesPage from './pages/PopularMoviesPage'
import TopMoviesPage from './pages/TopMoviesPage'
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviePage from './pages/MoviePage'
import ActorPage from './pages/ActorPage'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/nowPlaying" element={<NowPlayingPage />} />
				<Route path="/popularMovies" element={<PopularMoviesPage />} />
				<Route path="/topMovies" element={<TopMoviesPage />} />
				<Route path="/movies/:id" element={<MoviePage />} />
				<Route path="/actors/:id" element={<ActorPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>

			<ReactQueryDevtools />
		</div>
	)
}

export default App
