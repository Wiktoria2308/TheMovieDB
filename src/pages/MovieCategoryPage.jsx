import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import BasicTable from "../components/BasicTable";
import useMovies from "../hooks/useMovies";
import { Image, Container } from "react-bootstrap";
import MovieImage from "../assets/images/movie.png";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";

const MovieCategoryPage = ({ type }) => {
  const { category } = useParams();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, error, isError, isLoading, refetch } = useMovies(
    category,
    type,
    page
  );


  const loadMore = () => {
    setIsLoadingMore(true);
    setPage(page + 1);
  };

  useEffect(() => {
    setMovies([]);
    setColumns([]);
    setPage(1);

    refetch();
  }, [type, category]);

  useEffect(() => {
    if (data && data.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setIsLoadingMore(false);
    }
  }, [data]);

  useEffect(() => {
    setColumns([
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
                    ? tableProps.row.original.vote_average
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
    ]);
  }, [type, category]);

  return (
    <div className="page-container">
      <Container className="py-5">
        {isLoading && !isLoadingMore ? <LoadingSpinner /> : null}

        {isError && <WarningAlert message={error.message} />}
        {data ? (
          <>
            <h4 className="text-uppercase mb-0">
              {category === 'movie' ? `${type.replace(/_/g, " ")} Movies` : `${type.replace(/_/g, " ")} Series`}
            </h4>
            <BasicTable columns={columns} data={movies} />
            {data.page < data.total_pages && (
              <div className="load-more-button-container">
                <button
                  className="btn btn-primary"
                  onClick={loadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default MovieCategoryPage;
