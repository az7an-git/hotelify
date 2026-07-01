import { useState } from "react";
import { addFoodItem } from "../../services/foodRegService";
import SubmitButton from "../common/button/SubmitButton";
import Loader from "../common/loader/Loader";

const FoodRegistration = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const available = true;

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (name && category && price && image && desc) {
      setLoading(true);
      await addFoodItem(name, category, price, image, available, desc);
      alert("Food Item Added Successfully");
      setLoading(false);
      setName("");
      setCategory("");
      setDesc("");
      setPrice("");
      setImage(null);
    }
  };

  return loading ? (
    <Loader msg={"Adding the Dish"} />
  ) : (
    <form
      onSubmit={handleAddFood}
      className=" max-md:space-y-3 max-md:mx-auto flex justify-center items-center flex-wrap space-x-4"
    >
      <input
        className={`${inputStyles} max-md:flex-1`}
        type="text"
        placeholder="Food Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={`${inputStyles} max-md:flex-1`}
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        className={`${inputStyles} max-md:flex-1`}
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      {["Full Course", "Lunch", "Breakfast"].map((cat) => (
        <div className="space-x-4 max-md:w-full">
          <label htmlFor="category">
            {cat}
            <input
              className={`${inputStyles} ms-1`}
              type="radio"
              name="category"
              value={cat}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
        </div>
      ))}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      {/* <button className='bg-blue-500 px-4 py-1 text-white hover:bg-blue-800 rounded-xl transition-all duration-300' type="submit">Add Food Item</button> */}
      <SubmitButton callToAction={"Add Food Item"} />
    </form>
  );
};

export default FoodRegistration;

export const inputStyles =
  "border border-yellow-800 rounded-lg px-2 py-1 focus:outline-none focus:border-yellow-300 focus:border-2";
