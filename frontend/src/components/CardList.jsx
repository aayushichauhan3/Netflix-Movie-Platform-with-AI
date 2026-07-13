import React from 'react'
import CardImg from '../assets/cardimg.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from 'react'
import "swiper/css";
import { Link } from 'react-router-dom';

const CardList = ({ title, category }) => {
    const [data, setData] = React.useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ1ZGJmN2I0MzY4MWNiZGVjNzg5ODZiOGRkNGFlNCIsIm5iZiI6MTc4Mzg1MzkxOS4yMTYsInN1YiI6IjZhNTM3MzVmYzRjYjhlYjVhYTNhNzU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.znHs-e0oNA3VFNSVmBu6uzmBdW6JBauQfED46DlD4po'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setData(res.results))
            .catch(err => console.error(err));
    }, [category])


    console.log(data);
    return (
        <div className="text-white md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>
            <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
                {data.map((item, index) => (
                    <SwiperSlide key={index} className="max-w-72">
                        <Link to={`/movie/${item.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt="" className="h-44 w-full object-center object-cover" />
                            <p className="text-center pt-2">{item.original_title}</p>
                        </Link>

                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default CardList