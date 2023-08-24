import Container from "react-bootstrap/Container";
import { useMemo } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import BasicTable from "../components/BasicTable";
import { useSearchParams } from "react-router-dom";
import useSearchMovies from "../hooks/useSearchMovies";
import Pagination from "../components/Pagination";
import MovieImage from "../assets/images/movie.png";
import ActorImage from "../assets/images/actor.png";
import { Image } from "react-bootstrap";
import { MdSearchOff } from "react-icons/md";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : null;
  const query = searchParams.get("query") ?? "";

  const {
    data: moviesSearch,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useSearchMovies(query, page);

  const columns = useMemo(() => {
    return [
      {
        id: "image",
        accessor: (row) => {
          if (row.media_type === "movie" || row.media_type === "tv") {
            return "poster_path";
          } else if (row.media_type === "person") {
            return "profile_path";
          } else {
            return null;
          }
        },
        Cell: (tableProps) => {
          if (tableProps.value === "profile_path") {
            const imagePath = tableProps.row.original.profile_path;

            return (
              <Image
                src={
                  imagePath
                    ? `https://image.tmdb.org/t/p/w500${imagePath}`
                    : ActorImage
                }
                alt="Actor"
                width={100}
              />
            );
          } else if (tableProps.value === "poster_path") {
            const imagePath = tableProps.row.original.poster_path;

            return (
              <Image
                src={
                  imagePath
                    ? `https://image.tmdb.org/t/p/w500${imagePath}`
                    : MovieImage
                }
                alt="Movie"
                width={100}
              />
            );
          } else {
            return null;
          }
        },
      },

	  {
		id: 'title',
		accessor: (row) => {
		  if (row.media_type === "movie") {
			return row.title;
		  } else if (row.media_type === "person" || row.media_type === "tv") {
			return row.name;
		  } else {
			return null;
		  }
		},
		Cell: (tableProps) => {
			return (
			  <div className="result-title-container" style={{ width: '15rem' }}>
				<p className="result-title-media-type mb-1">{tableProps.row.original.media_type.toUpperCase()}</p>
				<p className="result-title mb-1">{tableProps.value}</p>
				<p className="result-title-date">{tableProps.row.original.release_date ? tableProps.row.original.release_date.substring(0, 4) : tableProps.row.original.first_air_date ? tableProps.row.original.first_air_date.substring(0, 4) : null}</p>
			  </div>
			);
		  },
	  },
    ];
  }, []);

  return (
    <Container className="py-5 search-container">
      {isLoading && <LoadingSpinner />}

      {isError && <WarningAlert message={error.message} />}

      {isSuccess && moviesSearch.results && (
        <>
          {query && moviesSearch.results.length > 0 ? (
            <h4 className="pt-3">Search results for: '{query}'...</h4>
          ) : (
            <h4 className="pt-3">No search results for: '{query}'...</h4>
          )}
          {moviesSearch.results.length > 0 ? (
            <>
              <BasicTable columns={columns} data={moviesSearch.results} />
              <Pagination
                page={moviesSearch.page}
                numPages={
                  moviesSearch.total_pages === 0 ? 1 : moviesSearch.total_pages
                }
                hasPreviousPage={moviesSearch.page === 1 ? false : true}
                hasNextPage={
                  moviesSearch.page === moviesSearch.total_pages ? false : true
                }
                onPreviousPage={() =>
                  setSearchParams({ query: query, page: page - 1 })
                }
                onNextPage={() =>
                  setSearchParams({ query: query, page: page + 1 })
                }
              />
            </>
          ) : (
            <MdSearchOff className="no-search-results-icon" />
          )}
        </>
      )}
    </Container>
  );
};

export default SearchPage;
