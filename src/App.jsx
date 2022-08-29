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
import GenresPage from './pages/GenresPage'
import MoviesByGenrePage from './pages/MoviesByGenrePage'
import SearchPage from './pages/SearchPage'
import TrendingPage from './pages/TrendingPage'
import TrendingMoviesPage from './pages/TrendingMoviesPage'


function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/now-playing" element={<NowPlayingPage />} />
				<Route path='/genres' element={<GenresPage />} />
				<Route path="/movies-by-genre/:id" element={<MoviesByGenrePage />} />
				<Route path="/popular-movies" element={<PopularMoviesPage />} />
				<Route path="/top-movies" element={<TopMoviesPage />} />
				<Route path="/movies/:id" element={<MoviePage />} />
				<Route path="/actors/:id" element={<ActorPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/trending" element={<TrendingPage/>} />
				<Route path="/trending/trending-movies" element={<TrendingMoviesPage/>} />
				<Route path="*" element={<NotFound />} />
			</Routes>

			<ReactQueryDevtools />
		</div>
	)
}

export default App
