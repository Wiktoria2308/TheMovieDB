import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import BasicTable from "../components/BasicTable";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { useSearchParams } from "react-router-dom";
import { Image, Container } from "react-bootstrap";
import Pagination from "../components/Pagination";
import MovieImage from "../assets/images/movie.png";
import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";

const TrendingMoviesPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const time = searchParams.get("time") ?? "";
  const [whatTime, setWhatTime] = useState(time);
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  useEffect(() => {
    setWhatTime(time);
  }, [time]);

  const navigate = useNavigate();

  const {
    data: trending,
    error,
    isError,
    isLoading,
  } = useTrendingMovies(category, whatTime, page);

  const columns = useMemo(() => {
    return [
      {
        accessor: "poster_path",
        Cell: (tableProps) => (
          <a href={`/${category}/${tableProps.row.original.id}`}>
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
                    ? tableProps.row.original.vote_average.toFixed(1)
                    : null}
                </span>
              </div>
              <a className="result-title" href={`/${category}/${tableProps.row.original.id}`}><p className="mb-1">{tableProps.value ? tableProps.value : tableProps.row.original.name}</p>
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
        <h4 className="text-uppercase mb-0">Trending Movies for the {time}</h4>

        {isLoading && <LoadingSpinner />}

        {isError && <WarningAlert message={error.message} />}

        {trending && (
          <>
            <BasicTable columns={columns} data={trending.results} />
            <Pagination
              page={trending.page}
              numPages={trending.total_pages === 0 ? 1 : trending.total_pages}
              hasPreviousPage={trending.page === 1 ? false : true}
              hasNextPage={
                trending.page === trending.total_pages ? false : true
              }
              onPreviousPage={() =>
                setSearchParams({ page: page - 1, time: whatTime })
              }
              onNextPage={() =>
                setSearchParams({ page: page + 1, time: whatTime })
              }
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default TrendingMoviesPage;
