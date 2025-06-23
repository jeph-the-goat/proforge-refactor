'use client';
import styles from "@/styles/common/SectionTestimonial.module.scss";

import React from 'react';
import {clsx} from "clsx";
import {Swiper, SwiperSlide} from "swiper/react";
import { FreeMode, Autoplay } from 'swiper/modules';

import {SectionTestimonialList} from "@/utils";

import {SectionTitle, Avatar} from "@/components";
import {IcnUsers} from "@assets/icons";

export const SectionTestimonial = () => {
  return (
    <section className={clsx(styles.cSectionTestimonial, "c-section-testimonial")}>

      <div className="c-section-testimonial-header">

        <div className="c-container">

          <SectionTitle
            badgeIcon={<IcnUsers/>}
            badgeText="Testimonials"
            headingClass="h3"
            title="Real Success, Real People"
            paragraph="Trusted by developers and enterprises worldwide. See how we’ve helped them achieve their Web3 goals."
          />
        </div>

      </div>

      <div className="c-section-testimonial-slider">

        <Swiper
          className="c-section-testimonial-swiper"
          modules={[FreeMode, Autoplay]}
          spaceBetween={0}
          slidesPerView={"auto"}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
          }}
          freeMode={{
            enabled: true,
          }}
        >
          {SectionTestimonialList.map((testimonial, testimonialIdx) => (
            <SwiperSlide key={testimonialIdx}>

              <article className="c-section-testimonial-slider-card">

                <div className="c-section-testimonial-slider-card-body">

                  <span className="c-section-testimonial-slider-card-badge">
                    {testimonial.function}
                  </span>

                  <p className="h6">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="c-section-testimonial-slider-card-footer">

                  <Avatar
                    image={testimonial.image}
                    alt={testimonial.name}
                  />

                  <span>
                    <em>{testimonial.name}</em>
                    <small>{testimonial.jobTitle}</small>
                  </span>

                </div>

              </article>

            </SwiperSlide>
          ))}

        </Swiper>



      </div>

    </section>
  );
};