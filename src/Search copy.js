import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    console.log(search)
    const getSearchMovie = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${search}`);
        const movieList = res.data.data.movies;
        setSearchResult(movieList);
    }

    useEffect(() => {
        getSearchMovie()
    }, [search])
    return (
        <div>
            <form>
                <input type="text" onChange={e => setSearch(e.target.value)} />
                <button>SEARCH</button>
            </form>
            {
                searchResult?.map(it => <li>{it.title}</li>)
            }
        </div>
    )
}
//https://yts.mx/api/v2/list_movies.json?query_term=godfather
export default Search