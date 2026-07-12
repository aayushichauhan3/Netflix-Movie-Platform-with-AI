import React from 'react'
import CardImg from '../assets/cardimg.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CardList = () => {
    const data = [
        {
            id: 1,
            title: "card 1",
            description: "this is card 1",
            image: "https://picsum.photos/200/300"
        },{
            id: 2,
            title: "card 2",
            description: "this is card 2",
            image: "https://picsum.photos/200/300"
        },{
            id: 4,
            title: "card 4",
            description: "this is card 4",
            image: "https://picsum.photos/200/300"
        },{
            id: 5,
            title: "card 5",
            description: "this is card 5",
            image: "https://picsum.photos/200/300"
        },{
            id: 6,
            title: "card 6",
            description: "this is card 6",
            image: "https://picsum.photos/200/300"
        },{
            id: 7,
            title: "card 7",
            description: "this is card 7",
            image: "https://picsum.photos/200/300"
        },{
            id: 8,
            title: "card 8",
            description: "this is card 8",
            image: "https://picsum.photos/200/300"
        }
    ];

    return (
        <div className="text-white md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">Upcoming</h2>
            <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
                {data.map((item, index) => (
                    <SwiperSlide key={index} className="max-w-72">
                        <img src={CardImg} alt="" className="h-44 w-full object-center object-cove" />
                        <p className="text-center pt-2">A very good movie</p>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default CardList