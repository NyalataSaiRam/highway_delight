import { useContext, useEffect, useState } from "react";
import Card from "../components/Card.component";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader.component";
import { motion } from "motion/react";
import { AppContext } from "../appContext";
import type { ExperienceType } from "../modelTypes/ExperienceType";
import { handleAxiosError } from "../utils/utils";

const Home = () => {
  const { search } = useContext(AppContext);
  const [experiences, setExperiences] = useState<[ExperienceType] | []>([]);
  const baseUrl = import.meta.env.VITE_LOCAL_SERVER;
  const [loading, setLoading] = useState(false);

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const searchFunc = async () => {
    if (search.length === 0) {
      toast.error("Enter experiences");
      return;
    }
    try {
      const { data } = await axios.get(`${baseUrl}/experiences/find`, {
        params: { title: search },
      });
      setExperiences(data.experiences);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const getExperiences = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/experiences`);
      setExperiences(data.experiences);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExperiences();
  }, []);

  useEffect(() => {
    if (search.length !== 0) {
      searchFunc();
    } else {
      getExperiences();
    }
  }, [search]);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (search.length > 0) {
    if (experiences.length == 0) {
      return <p className="mt-4 text-center">No Results Found.</p>;
    }
  }

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      className="w-full h-full grid 
      grid-cols-1  gap-4 py-4 
      md:grid-cols-2
      lg:grid-cols-4 lg:px-[124px] lg:py-10 lg:gap-14
      
      "
    >
      {experiences?.length &&
        experiences.map((ex) => (
          <Card
            key={ex._id}
            id={ex._id}
            imageUrl={ex.imageUrl}
            title={ex.title}
            location={ex.location}
            description={ex.description}
            price={ex.price}
            place=""
          />
        ))}
    </motion.div>
  );
};

export default Home;
