import React, { lazy, Suspense } from "react";
import "./home.css";
import Loader from "../common/loader/Loader";

import { motion } from "framer-motion";

const Hero = lazy(() => import('./Hero'));
const About = lazy(() => import('./About'));
const Rooms = lazy(() => import('./Rooms'));
const Amenity = lazy(() => import('./Amenities'));
const Gallery = lazy(() => import('./Gellery'));
const Reviews = lazy(() => import('./Testimonials'));
const SubmitReview = lazy(() => import('./SubmitTesimonial'));

const Divider = () => (
  <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-amber-200/80 to-transparent my-12 sm:my-20"></div>
);

const SlideUpSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const HomeMain = () => {
  return (
    <div>
      <Suspense fallback={
        <Loader msg={"Home..."} />
      }>
        <SlideUpSection>
          <Hero />
        </SlideUpSection>
        <Divider />
        <SlideUpSection>
          <About />
        </SlideUpSection>
        <Divider />
        <SlideUpSection>
          <Rooms />
        </SlideUpSection>
        <Divider />
        <SlideUpSection>
          <Amenity />
        </SlideUpSection>
        <Divider />
        <SlideUpSection>
          <Gallery />
        </SlideUpSection>
        <Divider />
        <SlideUpSection>
          <Reviews />
        </SlideUpSection>
        <SlideUpSection>
          <SubmitReview />
        </SlideUpSection>
      </Suspense>
    </div>
  );
};

export default HomeMain;
