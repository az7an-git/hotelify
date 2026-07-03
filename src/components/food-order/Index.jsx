import React, { useEffect, useState } from "react";
import { saveFoodOrder } from "../../services/foodService";
import FoodCard from "./FoodCard";
import { auth } from "../../firebase/Firebase";
import { fetchFoodItems } from "../../services/foodRegService";
import { Timestamp } from "firebase/firestore";
import Loader from "../common/loader/Loader";
import Tabs from "./Tabs";
import BookingForm from "./BookingForm";
import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

import PageHeader from "../common/header/PageHeader";

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
      toast.error(NOTIFICATIONS.FOOD_ORDER_EMPTY);
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
        toast.success(NOTIFICATIONS.FOOD_ORDER_SUCCESS);
        setFormData({
          name: "",
          contact: "",
          address: "",
        });
      } catch (error) {
        console.error("Error placing the order:", error);
        toast.error(NOTIFICATIONS.FOOD_ORDER_ERROR);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error(NOTIFICATIONS.FOOD_ORDER_FIELDS_REQUIRED);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  return loading ? (
    <Loader msg={"Fetching Food Items"} />
  ) : (
    <div className="max-w-7xl mx-auto p-6 space-y-6 relative">
      <PageHeader 
        title="Food Order" 
        subtitle="Select from our chef-crafted gourmet menu options." 
      />
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