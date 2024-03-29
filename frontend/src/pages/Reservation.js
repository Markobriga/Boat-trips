import React, {useEffect, useState} from "react";
import FormCard from "../components/formCard";
import PersonalInfo from "../modules/PersonalInfo";
import Checkout from "../modules/Checkout";
import ReservationSuccess from "../modules/ReservationSuccess";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
    const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  const { cartTrip } = useSelector(state=>state.cart)
  const navigate = useNavigate()

  useEffect(() => {
    if(!cartTrip.trip) {
        navigate("/")
    } 
  },[])

    return (
        <div className="mx-auto max-w-screen-xl flex w-full justify-center py-10">
            <FormCard currentStep={formStep} >
                { formStep >=0 && (
                    <PersonalInfo
                        formStep={formStep}
                        nextFormStep={nextFormStep}
                    />    
                )}
                {formStep >=1 && (
                    <Checkout
                        formStep={formStep}
                        nextFormStep={nextFormStep}
                        prevFormStep={prevFormStep}
                    />
                )}
                {formStep > 1 && <ReservationSuccess />}
            </FormCard>
        </div>
    )
}

export default Reservation