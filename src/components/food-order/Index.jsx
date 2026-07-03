import React, { useEffect, useState } from "react";
import { saveFoodOrder } from "../../services/foodService";
import FoodCard from "./FoodCard";
import { auth } from "../../firebase/Firebase";
import { fetchFoodItems } from "../../services/foodRegService";
import { Timestamp } from "firebase/firestore";
import Loader from "../common/loader/Loader";
import Tabs from "./Tabs";
import BookingForm from "./BookingForm";

const categories = ["All", "Full Course", "Lunch", "Breakfast"];

const FoodOrderMain = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [order, setOrder] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  });
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState({ type: "", text: "" });

  const showToast = (type, text) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const fetchAllFoodOrders = async () => {
      const foodOreders = await fetchFoodItems();
      setFoodItems(foodOreders);
      setLoading(false);
    };
    fetchAllFoodOrders();
  }, []);

  const handleCategoryChange = (category) => setSelectedCategory(category);

  const handleQuantityChange = (foodItem, quantity) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [foodItem.id]: { ...foodItem, quantity },
    }));
  };

  const handleSubmitOrder = async () => {
    const items = Object.values(order).filter((item) => item.quantity > 0);
    if (items.length === 0) {
      showToast("error", "Please add items to your order.");
      return;
    }

    const orderData = {
      userId: auth.currentUser.uid,
      name: formData.name,
      contact: formData.contact,
      address: formData.address,
      items,
      status: "pending",
      applyDate: Timestamp.fromDate(new Date()),
    };
    if (
      formData.name.trim() &&
      formData.address.trim() &&
      formData.contact.trim()
    ) {
      setIsSubmitting(true);
      try {
        await saveFoodOrder(orderData);
        showToast("success", "Order placed successfully!");
        setFormData({
          name: "",
          contact: "",
          address: "",
        });
      } catch (error) {
        console.error("Error placing the order:", error);
        showToast("error", "Something went wrong. Please try again!");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      showToast("error", "Fill all the details, please!");
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  return loading ? (
    <Loader msg={"Fetching Food Items"} />
  ) : (
    <div className="max-w-6xl mx-auto p-6 space-y-6 relative">
      {/* Sleek Success/Error Toast */}
      {toastMsg.text && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in w-full max-w-sm px-4">
          <div className={`glass-card p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg backdrop-blur-xl border ${toastMsg.type === 'success' ? 'bg-emerald-500/10 border-emerald-400/50 shadow-emerald-500/20' : 'bg-rose-500/10 border-rose-400/50 shadow-rose-500/20'
            }`}>
            {toastMsg.type === 'success' ? (
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : (
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            <span className={`font-bold text-sm ${toastMsg.type === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}>
              {toastMsg.text}
            </span>
          </div>
        </div>
      )}

      <div className="border-b border-white/60/80 pb-4 mb-6">
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
          Food Order
        </h1>
        <p className="text-slate-600 font-medium text-sm mt-1">Select from our chef-crafted gourmet menu options.</p>
      </div>
      <Tabs
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
      {foodItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((foodItem) => (
              <FoodCard
                key={foodItem.id}
                foodItem={foodItem}
                onQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/50/50 rounded-2xl border border-white/60/80 text-slate-600 font-medium text-base">
              No Items Found in this Category try Choosing Something else please
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/50/50 rounded-2xl border border-white/60/80 text-slate-600 font-medium text-base">
          No items Found
        </div>
      )}
      <BookingForm
        order={order}
        formData={formData}
        setFormData={setFormData}
        handleSubmitOrder={handleSubmitOrder}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default FoodOrderMain;