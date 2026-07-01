import React, { useEffect, useState } from "react";
import { inputStyles } from "../registrations/FoodRegistration";
import { addToGallery, fetchFromGallery } from "../../services/galleryService";
import SubmitButton from "../common/button/SubmitButton";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../contexts/authContext";

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const allGalleryImages = async () => {
      const galleryImages = await fetchFromGallery();
      setAllImages(galleryImages);
    };
    allGalleryImages();
  }, []);
  const handleAddPic = async (e) => {
    e.preventDefault();
    if (images) {
      setLoading(true);
      await addToGallery(images);
      setImages(null);
      setLoading(false);
      alert("images added succesfully");
    } else {
      alert("try again");
    }
  };
  const handleDeletePic = async (id) => {
    await deleteDoc(doc(db, "galleryPics", id));
    alert(`Picture with id ${id} has been deleted`);
  };

  return (
    <section className="py-4 max-md:mt-5 lg:py-16">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">Gallery</h2>
        {loading ? (
          <p>Adding Picture....</p>
        ) : (
          <div className="flex space-x-4 space-y-4 justify-center items-center flex-wrap relative">
            {/* Carousel items here */}
            {allImages.map((img, index) => (
              <div
                key={index}
                className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-500"
              >
                <img
                  src={img.imageUrl}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />
                {currentUser &&
                  currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
                    <div
                      className="font-bold italic absolute top-5 right-5 cursor-pointer text-2xl text-pink-400"
                      onClick={() => handleDeletePic(img.id)}
                    >
                      <MdDelete />
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
        {currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" && (
          <form onSubmit={handleAddPic} action="">
            Add image to gallery here
            {/* <input
       type="file"
       className={`${inputStyles}`}
       value={images}
       onChange={(e) => setImages(e.target.files[0])}
         /> */}
            <input
              type="file"
              className={`${inputStyles} mt-3 me-3`}
              onChange={(e) => setImages(e.target.files[0])}
              required
            />
            {/* <button type='submit'>Add</button> */}
            <SubmitButton callToAction={"Add Picture"} />
          </form>
        )}
      </div>
    </section>
  );
};

export default GallerySection;