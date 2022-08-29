import { useEffect } from "react";


/**
 * if there is no movies in local storage first make empty array if not get movies from localstorage
 * filter array to remove movies with the same id
 * add movie to array with movies
 * if there is more than 10 movies in the array remove first element in the array
 * set movies in local storage with new movie
 * @param {*} data = all info data about film we store
 * @param {*} id = id of one film
 */

const useLocalStorage = (data, id) => {
    useEffect(() => {
        if(data) {
            let movies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []
            movies = movies.filter((movie) => movie.id !== id)
            movies.push({id:id, title: data.title})
            if(movies.length > 10) {
                movies.shift()
            }
            localStorage.setItem('movies', JSON.stringify(movies))
        }
    },[data])
}

export default useLocalStorage
