import { useEffect } from "react";

const useLocalStorage = (data, id) => {
    useEffect(() => {
        if(data) {
            let movies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []
            movies = movies.filter((movie) => movie.id !== id)
            movies.push({id:id, title: data.title})
            if(movies.length > 10) {
                movies.shift()
            }
            // movies = movies.slice(0, 10)
            localStorage.setItem('movies', JSON.stringify(movies))
        }
    },[data])
}

export default useLocalStorage
