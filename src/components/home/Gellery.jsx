import React, { useEffect, useState } from "react";
import { inputStyles } from "../registrations/FoodRegistration";
import { addToGallery, fetchFromGallery } from "../../services/galleryService";
import SubmitButton from "../common/button/SubmitButton";
import { deleteDoc, doc } from "firebase/firestore";
import { db, ADMIN_UID } from "../../firebase/Firebase";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../contexts/authContext";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
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
      try {
        await addToGallery(images);

        // Refresh the gallery images so the new one appears immediately
        const updatedImages = await fetchFromGallery();
        setAllImages(updatedImages);

        setImages(null);
        e.target.reset(); // Clear the file input visually
        toast.success(NOTIFICATIONS.GALLERY_ADD_SUCCESS);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(NOTIFICATIONS.GALLERY_ADD_ERROR);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error(NOTIFICATIONS.GALLERY_SELECT_IMAGE);
    }
  };
  const handleDeletePic = async (id) => {
    await deleteDoc(doc(db, "galleryPics", id));
    toast.success(NOTIFICATIONS.GALLERY_DELETE_SUCCESS(id));
  };

  return (
    <section className="py-12 lg:py-24 my-8 mx-4">
      <div className="container mx-auto px-4 sm:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800">Gallery</span>
        </h2>
        {loading ? (
          <p className="text-amber-600 animate-pulse font-semibold">Adding Picture...</p>
        ) : allImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-5xl mx-auto">
            {allImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square glass-card rounded-3xl overflow-hidden shadow-xl border-2 border-white/60 group hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={img.imageUrl}
                  alt="Gallery"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                />
                {currentUser &&
                  currentUser.uid === ADMIN_UID && (
                    <button
                      className="absolute top-3 right-3 bg-white/80 p-2.5 rounded-full text-rose-500 hover:text-rose-700 hover:bg-white shadow-md transition-colors opacity-0 group-hover:opacity-100 transform active:scale-95"
                      onClick={() => handleDeletePic(img.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 font-medium italic mb-8">No gallery images uploaded yet.</p>
        )}

        {/* Admin Only Upload Toggle */}
        {currentUser && currentUser.uid === ADMIN_UID && (
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={() => setShowAdminForm(!showAdminForm)}
              className="bg-amber-50/50 backdrop-blur-md text-amber-700 border border-amber-200/50 px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-amber-100/50 transition-all duration-300 transform active:scale-95"
            >
              {showAdminForm ? "Close Admin Panel" : "Admin: Upload Images"}
            </button>

            {showAdminForm && (
              <div className="max-w-xl mx-auto glass-card p-6 sm:p-8 rounded-3xl shadow-xl border border-white/60 mt-6 w-full animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-md uppercase tracking-wide">Admin</span>
                  Upload to Gallery
                </h3>
                <form onSubmit={handleAddPic} className="flex flex-col gap-4">
                  <input
                    type="file"
                    className="w-full file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 text-slate-600 bg-white/50 border border-slate-200 rounded-full px-2 py-2 cursor-pointer transition-colors disabled:opacity-50"
                    onChange={(e) => setImages(e.target.files[0])}
                    required
                    disabled={loading}
                  />
                  <button type="submit" disabled={loading} className="glass-button-primary w-full py-3 rounded-full text-lg font-semibold shadow-amber-500/10 hover:shadow-amber-500/20 disabled:opacity-50">
                    {loading ? "Adding..." : "Add Picture"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;