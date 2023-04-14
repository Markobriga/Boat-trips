import React, {useState} from "react";
import DatePicker from "tailwind-datepicker-react";

const DateComponent = ({initialDate, handleChange}) => {

    const [show, setShow] = useState(false)

    const handleClose = (state) => {
        setShow(state)
    }

    const options = {
        autoHide: true,
        minDate: new Date(),
        defaultDate: new Date(initialDate),
    }

    return (
        <DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose}/>
    )
}

export default DateComponent