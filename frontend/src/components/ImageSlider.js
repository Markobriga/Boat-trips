import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

const ImageSlider = ({images}) => {

    return (
        <Swiper 
            pagination={true}
            navigation={true}
            className="w-full"
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
        >
            {images.map((image) => 
                <SwiperSlide key={image._id}>
                    <img className="rounded-md object-cover aspect-video w-full" src={image.url} alt="" />
                </SwiperSlide>
            )}
        </Swiper>
    )
}

export default ImageSlider