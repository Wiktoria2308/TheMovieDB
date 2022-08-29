import { useState } from "react"
import { Link } from "react-router-dom"


const HomePage = () => {

	const [movies] = useState(localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : [])
	return (
	<>
		<div className="py-3 home-page">
			<h1 className="welcome-text">Welcome!</h1>
			{ movies && 
		     <>
			<h2 className='pb-0 mb-1 fw-bold text-white'>Latest shown movies:</h2>
			<ul className="text-white">
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
