import { useState } from "react"
import { Link } from "react-router-dom"


const HomePage = () => {

	// get movies from localstorage to show on page 
	const [movies] = useState(localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : [])
	return (
		<>
			<div className="py-3 home-page">
				<h1 className="welcome-text">Welcome!</h1>
				{movies &&
					<>
						<h3 className='pb-0 mb-4 text-white'>{movies.length ? 'Latest shown movies:' : null}</h3>
						<ul className="text-white shown-movies">
							{movies.map((movie, index) => (
								<li key={index}> <Link to={`/movies/${movie.id}`}>{movie.title}</Link></li>
							))}
						</ul>
					</>
				}
			</div>
		</>
	)

}

export default HomePage
