import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import './assets/scss/App.scss'
import NowPlayingPage from './pages/NowPlayingPage'
import PopularMoviesPage from './pages/PopularMoviesPage'
import TopMoviesPage from './pages/TopMoviesPage'
// import { ReactQueryDevtools } from 'react-query/devtools'
import MoviePage from './pages/MoviePage'
import ActorPage from './pages/ActorPage'
import MoviesByGenrePage from './pages/MoviesByGenrePage'
import SearchPage from './pages/SearchPage'
import TrendingMoviesPage from './pages/TrendingMoviesPage'
import Footer from './components/Footer'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/now-playing" element={<NowPlayingPage />} />
				<Route path="/movies-by-genre/:id/:name" element={<MoviesByGenrePage />} />
				<Route path="/popular-movies" element={<PopularMoviesPage />} />
				<Route path="/top-movies" element={<TopMoviesPage />} />
				<Route path="/:category/:id" element={<MoviePage/>} />
				<Route path="/:category/:id" element={<MoviePage/>} />
				<Route path="/actors/:id" element={<ActorPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/trending-movies" element={<TrendingMoviesPage/>} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
