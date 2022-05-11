const initialState = {
   items: {},
   opened: false,
   saved: [],
   totalPrice: 0,
}

const cart = (state = initialState, action) => {
   switch (action.type) {
      case 'IS_CART': {
         return {
            ...state,
            opened: action.payload
         }
      }
      case 'ADD_TO_CART': {
         return {
            ...state,
            items: { ...state.items, [action.payload.id]: action.payload },
            saved: [...state.saved, action.payload.id],
            totalPrice: state.totalPrice + action.payload.price
         }
      }
      case 'DELETE_FROM_CART': {
         const newItems = { ...state.items }
         delete newItems[action.payload.id]

         const newSaved = [...state.saved]
         let indexDel = newSaved.indexOf(action.payload.id)
         if (indexDel >= 0) {
            newSaved.splice(indexDel, 1)
         }

         return {
            ...state,
            items: newItems,
            saved: newSaved,
            totalPrice: state.totalPrice - action.payload.price

         }
      }
      case 'CLEAR_CART': {
         return {
            ...state,
            saved: [],
            totalPrice: 0,
         }
      }

      default:
         return state
   }

}

export default cart