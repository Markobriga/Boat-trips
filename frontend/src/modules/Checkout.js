import React from "react";

const Checkout = ({ formStep, nextFormStep, prevFormStep}) => {

    return (
        <div className={formStep === 1 ? "flex" : "hidden"}>
            
        </div>
    )
}

export default Checkout;