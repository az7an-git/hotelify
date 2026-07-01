import React, { useEffect, useState } from "react";
import WeddingHallCard from "./WeddingHallCard";
import { fetchHalls } from "../../services/hallRegService";
import Loader from "../common/loader/Loader";

const WeddingHalls = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllHalls = async () => {
      const allHalls = await fetchHalls();
      setHalls(allHalls);
      setLoading(false);
    };
    fetchAllHalls();
  }, []);
  return (
    <div className="md:container mx-auto py-4 md:p-4 ">
    <div className="flex justify-center items-center space-x-4 w-full  mx-auto  flex-wrap">
     {
      loading ? <Loader msg={"Fetching Halls"} /> : 
      <div className="flex flex-wrap ">
       {halls.map((hall) => (
          <WeddingHallCard key={hall.id} hall={hall} />
        ))}
       </div>
     }
      </div>
    </div>
  );
};

export default WeddingHalls;
