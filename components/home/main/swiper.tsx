import React, { useRef, useState } from 'react'
import styles from './main.module.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper'
import Image from 'next/image'

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={`mainSwiper ${styles.swiper}`}
      >
        {Array(9)
          .fill('')
          .map((_, index) => (
            <SwiperSlide key={index}>
              <Image
                priority={index === 0}
                fill
                sizes="100"
                src={`/images/main-swiper/${index + 1}.jpg`}
                alt={''}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
