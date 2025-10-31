import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext, type paymentDetailsType } from "../appContext";
import type { ExperienceType } from "../modelTypes/ExperienceType";
import type { detailsInitialType } from "../pages/Details.page";

type DetailsSidePanelType = {
  experience: ExperienceType;
  disableBtn: boolean;
  details: detailsInitialType;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const DetailsSidePanel = ({
  experience,
  disableBtn,
  details,
  setLoading,
}: DetailsSidePanelType) => {
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(experience.price);

  const navigate = useNavigate();

  const { setPaymentDetails } = useContext(AppContext);

  const calculateTax = () => {
    return 0.18 * subtotal;
  };

  const ProceedToPayment = async () => {
    try {
      const totaltax = calculateTax();
      const dateSlot = experience.dates[details.dateIdx].date;
      const dateId = experience.dates[details.dateIdx]._id;
      if (details.dateIdx == null || details.timeIdx == null) return;
      const timeSlot =
        experience.dates[details.dateIdx].times[details.timeIdx].time;
      const timeId =
        experience.dates[details.dateIdx].times[details.timeIdx]._id;
      const payDetails: paymentDetailsType = {
        experience_id: experience._id,
        title: experience.title,
        date: dateSlot,
        dateId,
        time: timeSlot,
        timeId,
        quantity: quantity,
        subtotal: subtotal,
        tax: totaltax,
        total: subtotal + totaltax,
      };
      setLoading(true);
      setPaymentDetails(payDetails);
      await new Promise((resolve) => setTimeout(resolve, 150));
      setLoading(false);
      navigate("/checkout");
    } catch (err) {
      console.log(err);
      toast.error("Cannot process you request");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSubtotal(experience.price * quantity);
  }, [quantity, experience.price]);

  useEffect(() => {
    if (details.timeIdx == null) return;
    const cnt = experience.dates[details.dateIdx].times[details.timeIdx]?.count;
    if (!cnt) return;
    if (quantity > cnt) {
      setQuantity(cnt);
      toast.error(`you can only book ${cnt} slots for the selected time`);
    }
  }, [details, experience.dates, quantity]);

  return (
    <div
      className="
        flex w-[387px] h-fit flex-col bg-[#EFEFEF] rounded-xl mx-auto
        p-6 lg:gap-6 lg:justify-self-end lg:translate-x-5 z-0

      "
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-x-[174px] gap-y-5">
          <span className="text-[16px] leading-5 text-[#656565] text-start">
            Start at
          </span>
          <span className="text-end  text-[14px]">
            ₹{experience && experience.price}
          </span>

          <span className="text-[16px] leading-5 text-[#656565] text-start">
            Quantity
          </span>
          <span className="text-end  text-[14px]">
            <span
              onClick={() =>
                setQuantity((prev) => {
                  if (prev > 1) {
                    return prev - 1;
                  }
                  return prev;
                })
              }
              className="p-1 hover:cursor-pointer"
            >
              -
            </span>
            <span className="p-1 ">{quantity}</span>
            <span
              onClick={() =>
                setQuantity((prev) => {
                  if (details.timeIdx == null) return prev;
                  const cnt =
                    experience.dates[details.dateIdx].times[details.timeIdx]
                      ?.count;
                  if (!disableBtn && prev < cnt) {
                    return prev + 1;
                  } else {
                    if (prev == cnt) {
                      toast.error(`Only ${cnt} slots available`);
                      return prev;
                    }
                    toast.error("Please select time to proceed");
                    return prev;
                  }
                })
              }
              className="p-1 hover:cursor-pointer"
            >
              +
            </span>
          </span>

          <span className="text-[16px] leading-5 text-[#656565] text-start">
            Subtotal
          </span>
          <span className="text-end  text-[14px]">₹{subtotal}</span>
          <span className="text-[16px] leading-5 text-[#656565] text-start">
            Tax
          </span>
          <span className="text-end  text-[14px]">₹{calculateTax()}</span>
        </div>
        <div className="h-0.5 bg-[#D9D9D9]"></div>
        <div className="flex justify-between font-medium text-5 leading-6">
          <span className="">Total</span>
          <span className="">₹{subtotal + calculateTax()}</span>
        </div>
        <button
          disabled={disableBtn}
          onClick={ProceedToPayment}
          className="
            disabled:bg-[#D7D7D7] disabled:cursor-not-allowed
            rounded-lg bg-[#FFD643] hover:cursor-pointer
            lg:w-[339px] lg:font-medium lg:text-4 lg:leading-5 px-5 py-3
          "
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DetailsSidePanel;
