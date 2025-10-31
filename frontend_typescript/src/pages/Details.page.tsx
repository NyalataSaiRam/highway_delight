import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.component";
import { ArrowLeft } from "lucide-react";
import DetailsSidePanel from "../components/DetailsSidePanel.component";
import type { ExperienceType } from "../modelTypes/ExperienceType";
import { handleAxiosError } from "../utils/utils";

export type detailsInitialType = {
  title: string;
  dateIdx: number;
  timeIdx: null | number;
  quantity: number;
  subtotal: number;
  taxes: number;
};

const detailsInitial: detailsInitialType = {
  title: "",
  dateIdx: 0,
  timeIdx: null,
  quantity: 1,
  subtotal: 0,
  taxes: 0,
};

const Details = () => {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_LOCAL_SERVER;
  const [experience, setExperience] = useState<ExperienceType>();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(detailsInitial);
  const navigate = useNavigate();

  function formatToMonthDay(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const getDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/experiences/${id}`);
      if (data) {
        setExperience(data);
        setDetails((prev) => ({
          ...prev,
          title: data.title,
          subtotal: data.price,
        }));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:px-32 lg:py-6 py-3 gap-4">
      <div className="flex gap-2 items-center font-medium text-[14px] leading-[18px]">
        <span
          onClick={() => navigate(-1)}
          className="w-5 h-5 hover:cursor-pointer"
        >
          <ArrowLeft className="w-full h-full" />
        </span>
        Details
      </div>
      <div className="grid grid-col-1 grid-rows-3 lg:grid-rows-2 grid-flow-col gap-8">
        {/* image start */}

        <div className="lg:w-[765px] lg:h-[381px] rounded-xl overflow-hidden">
          <img
            src={(experience && experience?.imageUrl) || ""}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* image end */}

        {/* details start */}

        <div className="lg:w-[765px] flex gap-8 flex-col ">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-2xl leading-8">
              {experience && experience.title}
            </p>
            <p className="text-[16px] leading-6 text-[#6C6C6C]">
              {experience && experience.description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-6">
            {/* choose date start */}
            <div className="flex flex-col gap-3">
              <p className="font-medium text-lg leading-[22px]">Choose date</p>
              <div className="flex gap-4 text-[#838383]">
                {experience &&
                  experience.dates.map((e, index) => (
                    <button
                      key={e._id}
                      onClick={() =>
                        setDetails((prev) => ({
                          ...prev,
                          dateIdx: index,
                          timeIdx: null,
                        }))
                      }
                      className={`${
                        index == details.dateIdx
                          ? "bg-[#FFD643] text-[#161616]"
                          : "border-[0.6px]"
                      }   border-[#BDBDBD] flex items-center justify-center rounded-sm py-2 px-3 text-[14px] leading-[18px] hover:cursor-pointer`}
                    >
                      {formatToMonthDay(e.date)}
                    </button>
                  ))}
              </div>
            </div>
            {/* choose date end */}

            {/* choose time start */}
            <div className="flex flex-col gap-3">
              <p className="font-medium text-lg leading-[22px]">Choose time</p>
              <div className="flex  flex-col  gap-3 text-[#838383]">
                <div className="flex gap-4 flex-col lg:flex-row">
                  {experience &&
                    experience.dates[details.dateIdx].times.map((t, ti) => (
                      <button
                        disabled={t.count == 0}
                        key={t._id}
                        onClick={() =>
                          setDetails((prev) => ({ ...prev, timeIdx: ti }))
                        }
                        className={`${
                          ti == details.timeIdx
                            ? "bg-[#FFD643] text-[#161616]"
                            : "border-[0.6px]"
                        } border-[#BDBDBD] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]  flex items-center justify-center rounded-sm py-2 px-3 text-[14px] leading-[18px] gap-1.5 hover:cursor-pointer`}
                      >
                        {t.time}
                        <span
                          className={`font-medium text-[10px] leading-3  lowercase ${
                            t.count == 0 ? "text-[#6A6A6A]" : "text-[#FF4C0A]"
                          }`}
                        >
                          {t.count == 0 ? "Sold out" : t.count + " left"}
                        </span>
                      </button>
                    ))}
                </div>
                <p className="text-xs leading-4 text-[#838383]">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            </div>
            {/* choose time end */}

            <div className="flex flex-col gap-3">
              <p className="font-medium text-lg leading-[22px]">About</p>
              <div className="flex items-center justify-start rounded-sm py-2 px-3 bg-[#EEEEEE] text-xs leading-4 text-[#838383]">
                Scenic routes, trained guides, and safety briefing. Minimum age
                10.
              </div>
            </div>
          </div>
        </div>
        {/* details end */}

        {/* payment summary start */}
        {experience && (
          <DetailsSidePanel
            disableBtn={details.timeIdx == null ? true : false}
            experience={experience}
            details={details}
            setLoading={setLoading}
          />
        )}
        {/* payment summary end */}
      </div>
    </div>
  );
};

export default Details;
