import React, { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import LoadingSpinner from '../components/LoadingSpinner';
import WarningAlert from '../components/alerts/WarningAlert';
import BasicTable from '../components/BasicTable';
import useMovies from '../hooks/useMovies';
import { Image } from 'react-bootstrap';
import MovieImage from '../assets/images/movie.png';


const MovieCategoryPage = ({ category }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [columns, setColumns] = useState([]);

  const { data, error, isError, isLoading, refetch } = useMovies(category, page);

  const loadMore = () => {
    setPage(page + 1);
  };
  
  useEffect(() => {
    // Clear previous data when the category changes
    setMovies([]);
    setColumns([]);

    // Refetch data based on the new category
    refetch();

  }, [category, refetch]);

  useEffect(() => {
    if (data && data.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    setColumns([
      {
        accessor: 'poster_path',
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
        accessor: 'title',
        Cell: (tableProps) => {
          return (
            <div className="result-title-container" style={{ width: '15rem' }}>
              <p className="result-title mb-1">{tableProps.value}</p>
              <p className="result-title-date">
                {tableProps.row.original.release_date
                  ? tableProps.row.original.release_date.substring(0, 4)
                  : null}
              </p>
            </div>
          );
        },
      },
    ])
  
  }, [category]);

  return (
    <div className='page-container'>
    <Container className="py-5">
      <h4 className="text-uppercase mb-0">{category.replace(/_/g, " ")} Movies</h4>

      {isLoading && <LoadingSpinner />}

      {isError && <WarningAlert message={error.message} />}

      {data && (
        <>
          <BasicTable columns={columns} data={movies} />
          {data.page < data.total_pages && (
            <div className="load-more-button-container">
              <button className="btn btn-primary" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </Container>
    </div>
  );
};

export default MovieCategoryPage;
