import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

export const addTripToCart = (id, amountAdult, amountChild) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/trip/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            trip: data.trip._id,
            boat: data.trip.boat,
            priceChild: data.trip.priceChild,
            priceAdult: data.trip.priceAdult,
            numberOfReservations: data.trip.numberOfReservations,
            amountAdult,
            amountChild
        }
    })

    sessionStorage.setItem("cart", JSON.stringify(getState().cart.cartTrip))
}