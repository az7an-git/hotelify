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

const Divider = () => (
  <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/50 to-transparent my-4 sm:my-8"></div>
);

const HomeMain = () => {
  return (
    <div>
    <Suspense fallback={
      <Loader msg={"Home..."}/>
    }>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Rooms />
      <Divider />
      <Amenity />
      <Divider />
      <Gallery />
      <Divider />
      <Reviews />
      <SubmitReview />
      </Suspense>
    </div>
  );
};

export default HomeMain;
