import { useState } from "react";
import { addHall } from "../../services/hallRegService";
import { inputStyles } from "./FoodRegistration";
import SubmitButton from "../common/button/SubmitButton";
import Loader from "../common/loader/Loader";

const HallRegistration = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pp, setPp] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([
    { title: "", description: "", price: "", validity: "" },
  ]);

  const available = true;

  const handleAddOffer = () => {
    setOffers([
      ...offers,
      { title: "", description: "", price: "", validity: "" },
    ]);
  };

  const handleOfferChange = (index, field, value) => {
    const updatedOffers = [...offers];
    updatedOffers[index][field] = value;
    setOffers(updatedOffers);
  };

  const handleAddHall = async (e) => {
    e.preventDefault();
    if (name && description && pp && image) {
      setLoading(true);
      await addHall(name, description, pp, image, available, offers);
      setLoading(false);
      setName("");
      setDescription("");
      setPp("");
      setImage(null);
      setOffers([{ title: "", description: "", price: "", validity: "" }]);
    }
  };

  return loading ? (
    <Loader msg={"Adding the hall"} />
  ) : (
    <form
      onSubmit={handleAddHall}
      className="hall-registration-form flex justify-center items-center space-x-4 flex-wrap max-md:space-y-3"
    >
      <input
        className={`${inputStyles} max-md:flex-1`}
        type="text"
        placeholder="Hall Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className={`${inputStyles} max-md:flex-1`}
        type="number"
        value={pp}
        onChange={(e) => setPp(e.target.value)}
        placeholder="Rate per person"
        required
      />
      <textarea
        rows={1}
        className={`${inputStyles} max-md:flex-1`}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      {/* Offers Section */}
      <div className="offers-section w-full ">
        <h3 className="font-semibold mb-2">Add Offers</h3>
        {offers.map((offer, index) => (
          <div
            key={index}
            className="offer-group flex flex-wrap space-x-4 mb-4 max-md:space-y-3"
          >
            <input
              className={`${inputStyles} max-md:flex-1`}
              type="text"
              placeholder="Offer Title"
              value={offer.title}
              onChange={(e) =>
                handleOfferChange(index, "title", e.target.value)
              }
              required
            />
            <input
              className={`${inputStyles} max-md:flex-1`}
              type="text"
              placeholder="Offer Description"
              value={offer.description}
              onChange={(e) =>
                handleOfferChange(index, "description", e.target.value)
              }
            />
            <input
              className={`${inputStyles} max-md:flex-1`}
              type="number"
              placeholder="Offer Price"
              value={offer.price}
              onChange={(e) =>
                handleOfferChange(index, "price", e.target.value)
              }
            />
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddOffer}
        >
          Add Another Offer
        </button>
      </div>

      <SubmitButton callToAction="Add Hall" />
    </form>
  );
};

export default HallRegistration;
