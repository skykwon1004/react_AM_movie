import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Search = () => {
    const [search, setSearch] = useSearchParams({});
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate(null)
    console.log(search)
    const sItm = search.get('query_term');
    console.log(sItm);
    const getSearchMovie = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${sItm}`);
        const movieList = res.data.data.movies;
        setSearchResult(movieList);
    }

    const searchForm = e => {
        e.preventDefault();
        navigate(`/?query_term=${sItm}`)

    }

    useEffect(() => {
        getSearchMovie()
    }, [search])
    return (
        <div>
            <form onSubmit={searchForm}>
                <input type="text" onChange={e => setSearch({ query_term: e.target.value })} />
                <button>SEARCH</button>
            </form>
            {
                sItm?.length > 2 && searchResult?.map(it => <li>{it.title}</li>)
            }
        </div>
    )
}
//https://yts.mx/api/v2/list_movies.json?query_term=godfather
export default Search