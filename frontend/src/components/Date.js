import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, {useState} from "react";
import DatePicker from "tailwind-datepicker-react";
import { format } from "date-fns";

const DateComponent = ({date, handleChange}) => {

    const [show, setShow] = useState(false)

    const handleClose = (state) => {
        setShow(state)
    }

    const options = {
        autoHide: true,
        minDate: new Date(),
        clearBtn: false,
        todayBtn: false,
    }

    return (
        <DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon width={20} height={20} color="#a0aec0"/>
                </div>
                <input type="text" name="date" id="date" className="cursor-pointer pl-9 pr-2.5 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onFocus={() => setShow(true)} placeholder="Select Date" value={date && format(new Date(date), 'dd.MM.yyyy')} readOnly/>
                <div onClick={()=>handleChange("")} className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                    <XMarkIcon width={20} height={20} color="#a0aec0"/>
                </div>
            </div>
        </DatePicker>
        
    )
}

export default DateComponent