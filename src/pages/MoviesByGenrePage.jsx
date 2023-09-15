import { useMemo } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import BasicTable from "../components/BasicTable";
import useMoviesByGenre from "../hooks/useMoviesByGenre";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import MovieImage from '../assets/images/movie.png'

const MoviesByGenrePage = ({type}) => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { id, name } = useParams();
  const {
    data: moviesByGenre,
    error,
    isError,
    isLoading,
  } = useMoviesByGenre(id, page, type);

  const columns = useMemo(() => {
    return [
      {
        accessor: "poster_path",
        Cell: (tableProps) => (
          <a href={`/${type}/${tableProps.row.original.id}`}>
            <Image
              src={
                tableProps.row.original.poster_path === null
                  ? MovieImage
                  : `https://image.tmdb.org/t/p/w500${tableProps.row.original.poster_path}`
              }
              alt="Movie poster"
              width={100}
            />
          </a>
        ),
      },
      {
        accessor: "title",
        Cell: (tableProps) => {
          return (
            <div className="result-title-container" style={{ width: "15rem" }}>
              <div className="my-2 d-flex align-items-center">
                <AiFillStar color="yellow" className="rating-icon" />
                <span className="rating-number">
                  {tableProps.row.original.vote_average
                    ? tableProps.row.original.vote_average
                    : null}
                </span>
              </div>
              <a className="result-title" href={`/${type}/${tableProps.row.original.id}`}><p className="mb-1">{tableProps.value ? tableProps.value : tableProps.row.original.name}</p>
                 </a>
                 <p className="result-title-date">{tableProps.row.original.release_date ? tableProps.row.original.release_date.substring(0, 4) : tableProps.row.original.first_air_date ? tableProps.row.original.first_air_date.substring(0, 4) : null}</p>

            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <div className="page-container">
      <Container className="py-5">
        <h4 className="text-uppercase mb-0">{type === 'movie' ? `${name} movies` : `${name} series`}</h4>

        {isLoading && <LoadingSpinner />}

        {isError && <WarningAlert message={error.message} />}

        {moviesByGenre && (
          <>
            <BasicTable columns={columns} data={moviesByGenre.results} />
            <Pagination
              page={moviesByGenre.page}
              numPages={
                moviesByGenre.total_pages === 0 ? 1 : moviesByGenre.total_pages
              }
              hasPreviousPage={moviesByGenre.page === 1 ? false : true}
              hasNextPage={
                moviesByGenre.page === moviesByGenre.total_pages ? false : true
              }
              onPreviousPage={() => setSearchParams({ page: page - 1 })}
              onNextPage={() => setSearchParams({ page: page + 1 })}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default MoviesByGenrePage;
