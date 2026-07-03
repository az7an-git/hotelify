import React, { useEffect, useState } from "react";
import WeddingHallCard from "./WeddingHallCard";
import { fetchHalls } from "../../services/hallRegService";
import Loader from "../common/loader/Loader";
import PageHeader from "../common/header/PageHeader";

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

  return loading ? (
    <Loader msg={"Fetching Halls"} />
  ) : (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Wedding Halls"
          subtitle="Elegant venues for your special occasions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {halls.map((hall) => (
            <WeddingHallCard key={hall.id} hall={hall} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingHalls;

