import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import BasicTable from "../components/BasicTable";
import useMovies from "../hooks/useMovies";
import { Image } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import MovieImage from '../assets/images/movie.png'

const PopularMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  
  const {
    data: popularMovies,
    error,
    isError,
    isLoading,
  } = useMovies('popular',page);

  const columns = useMemo(() => {
    return [
      {
        accessor: "poster_path",
        Cell: (tableProps) => (
          <a href={`/movies/${tableProps.row.original.id}`}>
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
      },
      {
        accessor: "release_date",
      },
    ];
  }, []);

  return (
      <Container className="py-5">
        <h4 className="text-uppercase mb-0">Popular Movies</h4>

        {isLoading && <LoadingSpinner />}

        {isError && <WarningAlert message={error.message} />}

        {popularMovies && (
          <>
            <BasicTable columns={columns} data={popularMovies.results} />
            <Pagination
              page={popularMovies.page}
              numPages={
                popularMovies.total_pages === 0 ? 1 : popularMovies.total_pages
              }
              hasPreviousPage={popularMovies.page === 1 ? false : true}
              hasNextPage={
                popularMovies.page === popularMovies.total_pages ? false : true
              }
              onPreviousPage={() => setSearchParams({ page: page - 1 })}
              onNextPage={() => setSearchParams({ page: page + 1 })}
            />
          </>
        )}
      </Container>
  );
};

export default PopularMoviesPage;
