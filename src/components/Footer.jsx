import { Link } from "react-router-dom";
import MovieIcon from '../assets/icons/movie-icon.jpeg'

const Footer = () => {
  return (
    <div className="footer">
    
    <a as={Link} to="/">
      <img
        src={MovieIcon}
        className="movie-icon"
        alt="movie-icon"
        width="30"
      ></img>
      The Movie DB <span>by Wiktoria Dobrzewinska</span>
    </a>
  </div>
  )
}

export default Footer