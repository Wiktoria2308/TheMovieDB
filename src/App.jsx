import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import './assets/scss/App.scss'
import MoviePage from './pages/MoviePage'
import ActorPage from './pages/ActorPage'
import MoviesByGenrePage from './pages/MoviesByGenrePage'
import SearchPage from './pages/SearchPage'
import TrendingMoviesPage from './pages/TrendingMoviesPage'
import Footer from './components/Footer'
import MovieCategoryPage from './pages/MovieCategoryPage'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies-by-genre/:id/:name" element={<MoviesByGenrePage type='movie'/>} />
				<Route path="/series-by-genre/:id/:name" element={<MoviesByGenrePage type='tv'/>} />
				<Route path="/:category/popular-movies" element={<MovieCategoryPage type="popular" />} />
				<Route path="/:category/popular-series" element={<MovieCategoryPage type="popular" />} />
				<Route path="/:category/top-movies" element={<MovieCategoryPage type="top_rated" />} />
				<Route path="/:category/now-playing" element={<MovieCategoryPage type="now_playing" />} />
				<Route path="/:category/on_the_air" element={<MovieCategoryPage type="on_the_air" />} />
				<Route path="/:category/:id" element={<MoviePage/>} />
				<Route path="/person/:id" element={<ActorPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path=":category/trending-movies" element={<TrendingMoviesPage/>} />
				<Route path=":category/trending-series" element={<TrendingMoviesPage/>} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
