import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from "./actions";
import { getTotal } from "./utils";



const AppContext = createContext();
export const useAppContext = () => useContext(AppContext)


const initialState = {
	loading: false,
	cart: new Map()
}



const AppProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const { totalAmount, totalCost } = getTotal(state.cart)

	const clearCart = () => {
		dispatch({ type: CLEAR_CART })
	}
	const removeItem = (id) => {
		dispatch({ type: REMOVE, payload: id })
	}

	const increase = (id) => {
		dispatch({ type: INCREASE, payload: id })
	}

	const decrease = (id) => {
		dispatch({ type: DECREASE, payload: id })
	}

	const fetchData = async () => {
		try {
			dispatch({ type: LOADING });
			const response = await fetch('https://www.course-api.com/react-useReducer-cart-project');
			const data = await response.json()
			dispatch({ type: DISPLAY_ITEMS, payload: data })
		} catch (error) {
			console.log(error.message)
			dispatch({ type: LOADING });
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<AppContext.Provider
			value={{ ...state, clearCart, removeItem, increase, decrease, totalAmount, totalCost }}
		>
			{children}
		</AppContext.Provider>
	)
}
export default AppProvider;