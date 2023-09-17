import { Link } from "react-router-dom";
import MovieIcon from '../assets/icons/wiktoria-logo.png'

const Footer = () => {
  return (
    <div className="footer">
    
    <a as={Link} to="/">
      <img
        src={MovieIcon}
        className="movie-icon"
        alt="movie-icon"
        width="100"
      ></img><span className="footer-logo-text">by Wiktoria Dobrzewinska</span>
    </a>
  </div>
  )
}

export default Footer