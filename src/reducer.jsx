import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from "./actions";
const reducer = (state, action) => {
	if (action.type === CLEAR_CART) {
		const clearedCart = new Map();
		return { ...state, cart: clearedCart }
	}

	if (action.type === REMOVE) {
		const newMap = new Map(state.cart)
		newMap.delete(action.payload)
		return { ...state, cart: newMap }
	}

	if (action.type === INCREASE) {
		const newMap = new Map(state.cart)
		const itemToIncrease = newMap.get(action.payload)
		const newItem = { ...itemToIncrease, amount: itemToIncrease.amount + 1 }
		newMap.set(newItem.id, newItem);
		return { ...state, cart: newMap }
	}

	if (action.type === DECREASE) {
		const newMap = new Map(state.cart)
		const itemToDecrease = newMap.get(action.payload)
		if (itemToDecrease.amount > 1) {
			const newItem = { ...itemToDecrease, amount: itemToDecrease.amount - 1 }
			newMap.set(newItem.id, newItem);
		} else {
			newMap.delete(itemToDecrease.id)
		}
		return { ...state, cart: newMap }
	}

	if (action.type === LOADING) {
		return { ...state, loading: true }
	}

	if (action.type === DISPLAY_ITEMS) {
		const newMap = new Map(action.payload.map(item => [item.id, item]))
		return { ...state, cart: newMap, loading: false }
	}
}



export default reducer;