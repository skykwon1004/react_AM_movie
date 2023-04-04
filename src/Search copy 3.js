import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Search = () => {
    const [movie, setMovie] = useState([]);
    const [input, setInput] = useState(null);
    const getMovie = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${input}`);
        setMovie(res.data.data.movies)
    }
    useEffect(() => {
        getMovie();
    }, [input]);

    const searchHandler = e => {
        if (e.target.value.length > 2) {
            setInput(e.target.value)
        } else {
            setInput(null)
        }
    }
    return (
        <div className='Search'>
            <form>
                <input type="text" onChange={searchHandler} />
                <button>
                    <i className='xi-search'></i>
                </button>
            </form>
            <>
                {
                    movie ? <div>
                        {
                            movie.map(it => {
                                return (
                                    <figure>
                                        <img src={it.medium_cover_image} alt="" />
                                    </figure>
                                )
                            })
                        }
                    </div>
                        : null
                }

            </>


        </div>
    )
}
//https://yts.mx/api/v2/list_movies.json?query_term=godfather
export default Search