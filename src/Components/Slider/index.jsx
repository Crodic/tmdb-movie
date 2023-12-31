import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselData } from "../../Redux/selector";
import { fetchTrending } from "../../Redux/SliceReducer/carouselSlice";
import { useNavigate } from "react-router-dom";

export default function Slider() {
    const { data } = useSelector(getCarouselData);
    const dataImages = data.data?.results;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTrending());
    }, []);

    const handleClick = (id) => {
        navigate(`/movie/${id}?type=movie`);
    };

    return (
        <Swiper
            pagination={{
                dynamicBullets: true,
            }}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
        >
            {dataImages &&
                dataImages.length > 0 &&
                dataImages.map((image) => {
                    return (
                        <SwiperSlide key={image.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${image.backdrop_path}`}
                                alt={image.title}
                                title={image.title}
                                className="images-banner"
                                onClick={() => {
                                    handleClick(image.id);
                                }}
                            />
                        </SwiperSlide>
                    );
                })}
        </Swiper>
    );
}
