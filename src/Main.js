import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import All from './All';
import List from './List';
import Load from './Load';

const Main = ({ limit }) => {
    //데이터 가져오기
    const [movie, getMovie] = useState([]);
    const [load, setLoad] = useState(true);
    const MS = useRef(null);
    const handleImgError = (e) => {
        e.target.src = process.env.PUBLIC_URL + "/cover.jpg";
    }
    const movieData = async () => {
        setLoad(true)
        const movie = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}`);
        getMovie(movie.data.data.movies);
        //console.log(movie.data.data.movies);
    }
    useEffect(() => {
        movieData();
        setLoad(false)
    }, [])

    const settings = {
        arrows:false,
        // dots: true,
        // infinite: true,
        // speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        // centerMode:true,
        // centerPadding:'100px'
    };

    return (
        <>
            <section className='Main'>
                <Outlet />
                {
                    load
                        ? <Load />
                        :
                        <Slider {...settings} ref={MS}
                            // slidesToShow={4}
                            // arrows={false}
                            // ref={MS}
                            // centerMode={true}
                            // centerPadding={'100px'}
                        >
                            {
                                movie?.map(it => {
                                    return (
                                        <div key={it.id} className="itm">

                                            <Link to={`/detail/${it.id}`}>
                                                <figure>
                                                    <img src={it.large_cover_image} alt={it.title} onError={handleImgError} />
                                                </figure>
                                                <div className="case">
                                                    <div className='title'>{it.title_long}</div>
                                                    <div className='desc'>{it.description_full.substr(0, 100)} ... </div>
                                                    <ul className='genre'>
                                                        {
                                                            it.genres?.map((g, i) => <li key={i}>{g}</li>)
                                                        }
                                                    </ul>
                                                </div>
                                            </Link>

                                        </div>
                                    )
                                })
                            }
                        </Slider>
                }

                <div className="arrows">
                    <i className="xi-arrow-left" onClick={() => MS.current.slickPrev()}></i>
                    <i className="xi-arrow-right" onClick={() => MS.current.slickNext()}></i>
                </div>

            </section>
            <All />
            <List genre='Music' limit={16} />
            <List genre='Sport' limit={16} />
            <List genre='History' limit={16} />
            <List genre='Fantasy' limit={16} />
            <List genre='Crime' limit={16} />
            {/* <List genre='Film Noir' limit={16} /> */}
            <List genre='Horror' limit={16} />
            <List genre='Mystery' limit={16} />
            <List genre='Biography' limit={16} />
            <List genre='Sci-Fi' limit={16} />
            {/* <List genre='Short Film' limit={16} /> */}
            <List genre='War' limit={16} />
            <List genre='Western' limit={16} />
        </>
    )
}


export default Main;