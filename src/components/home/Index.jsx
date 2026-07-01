import React, { lazy, Suspense } from "react";
import "./home.css";
import Loader from "../common/loader/Loader";


const Hero = lazy(() => import('./Hero'));
const About = lazy(() => import('./About'));
const Rooms = lazy(() => import('./Rooms'));
const Amenity = lazy(() => import('./Amenities'));
const Gallery = lazy(() => import('./Gellery'));
const Reviews = lazy(() => import('./Testimonials'));
const SubmitReview = lazy(() => import('./SubmitTesimonial'));

const HomeMain = () => {
  return (
    <div>
    <Suspense fallback={
      <Loader msg={"Home..."}/>
    }>
      <Hero />
      <About />
      <Rooms />
      <Amenity />
      <Gallery />
      <Reviews />
      <SubmitReview />
      </Suspense>
    </div>
  );
};

export default HomeMain;
