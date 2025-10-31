import { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader.component";
import { AppContext } from "../appContext";
import { handleAxiosError } from "../utils/utils";

const Checkout = () => {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { paymentDetails } = useContext(AppContext);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [iagree, setIagree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [disableApplyBtn, setDisableApplyBtn] = useState(false);

  const urlBase = import.meta.env.VITE_LOCAL_SERVER;

  const [discount, setDiscount] = useState(0);

  const applyPromoCode = async () => {
    console.log("promo");
    if (promoCode.length < 3) {
      toast.error("Invalid promo code");
      return;
    }

    if (fullname.length < 3) {
      toast.error("Please enter valid full name");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      setLoading2(true);
      const {
        data: { allowDiscount },
      } = await axios.post(`${urlBase}/promo/validate`, {
        email,
        code: promoCode,
      });
      setDiscount(allowDiscount);
      toast.success("Promo code applied ");
      setDisableApplyBtn(true);
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading2(false);
  };

  const bookExperience = async () => {
    if (!iagree) {
      toast.error("Please agree to the terms and safety policy. ");
      return;
    }
    if (fullname.length < 3) {
      toast.error("Fullname must be 3 letters long");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      setLoading(true);
      if (paymentDetails == null) {
        setLoading(false);
        return;
      }
      const booking = {
        ...paymentDetails,
        fullname,
        email,
        afterDiscount: paymentDetails.total - discount,
      };

      const {
        data: { id },
      } = await axios.post(`${urlBase}/bookings`, booking);
      setLoading(false);
      navigate(`/confirmation/${id}`);
    } catch (error) {
      handleAxiosError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!paymentDetails) {
      navigate("/");
    }
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
        Checkout
      </div>
      <div className="flex flex-wrap justify-between gap-8">
        {/* details start */}
        <div className="lg:w-[739px] h-fit rounded-xl py-5 px-6 flex gap-4 bg-[#EFEFEF] flex-col  mx-auto lg:mx-0 ">
          <div className="flex flex-wrap   w-full gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[14px] capitalize leading-[18px] text-[#5B5B5B]">
                Full name
              </p>
              <input
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                type="text"
                name="fullname"
                className="rounded-md py-3 px-4 bg-[#DDDDDD] outline-0"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[14px] capitalize leading-[18px] text-[#5B5B5B]">
                email
              </p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                name="email"
                className="rounded-md py-3 px-4 bg-[#DDDDDD] outline-0"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1 flex">
              <input
                onChange={(e) => setPromoCode(e.target.value)}
                value={promoCode}
                type="text"
                name="promoCode"
                className="rounded-md py-3 px-4 bg-[#DDDDDD] outline-0 flex-1"
                placeholder="Promo code"
              />
              {loading2 && (
                <div className="absolute right-1">
                  <Loader />
                </div>
              )}
            </div>
            <button
              disabled={disableApplyBtn}
              onClick={applyPromoCode}
              className="flex disabled:cursor-not-allowed hover:cursor-pointer items-center justify-center rounded-lg py-3 px-4 bg-[#161616] text-[#F9F9F9] font-medium text-[14px] leading-[18px]"
            >
              Apply
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              checked={iagree}
              onChange={(e) => setIagree(e.target.checked)}
              type="checkbox"
              className="w-3 h-3 accent-[#161616]"
            />
            <p className="text-xs leading-4 text-[#5B5B5B]">
              I agree to the terms and safety policy.
            </p>
          </div>
        </div>
        {/* details end */}

        {/* payment summary start */}
        <div
          className="
            flex w-[387px] h-fit flex-col bg-[#EFEFEF] rounded-xl  mx-auto
            p-6 lg:gap-6  lg:mx-0
          "
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-x-[174px] gap-y-5">
              <span className="text-[16px] leading-5 text-[#656565] text-start">
                Experience
              </span>
              <span className="text-end text-[14px] text-nowrap capitalize">
                {paymentDetails && paymentDetails.title}
              </span>

              <span className="text-[16px] leading-5 text-[#656565] text-start">
                Date
              </span>
              <span className="text-end  text-[14px]">
                {paymentDetails && paymentDetails.date}
              </span>
              <span className="text-[16px] leading-5 text-[#656565] text-start">
                Time
              </span>
              <span className="text-end text-[14px]">
                {paymentDetails && paymentDetails.time}
              </span>
              <span className="text-[16px] leading-5 text-[#656565] text-start">
                Qty
              </span>
              <span className="text-end text-[14px]">
                {paymentDetails && paymentDetails.quantity}
              </span>
              <span className="text-[16px] leading-5 text-[#656565] text-start">
                Subtotal
              </span>
              <span className="text-end text-[14px]">
                ₹{paymentDetails && paymentDetails.subtotal}
              </span>
              <span className="text-[16px] leading-5 text-[#656565] text-start">
                Tax
              </span>
              <span className="text-end text-[14px]">
                ₹{paymentDetails && paymentDetails.tax}
              </span>
            </div>
            <div className="h-0.5 bg-[#D9D9D9]"></div>
            <div className="flex justify-between font-medium text-5 leading-6">
              <span className="">Total</span>
              <span className="">
                ₹{paymentDetails && paymentDetails.total}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between font-medium text-5 leading-6">
                <span className="">After discount</span>
                <span className="">
                  ₹{paymentDetails && paymentDetails.total - discount}
                </span>
              </div>
            )}
            <button
              onClick={bookExperience}
              className="
                rounded-lg bg-[#FFD643] hover:cursor-pointer
                lg:w-[339px] lg:font-medium lg:text-4 lg:leading-5 px-5 py-3
              "
            >
              Pay and Confirm
            </button>
          </div>
        </div>
        {/* payment summary end */}
      </div>
    </div>
  );
};

export default Checkout;
