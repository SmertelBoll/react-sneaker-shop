import axios from "axios"

export const fetchSneakers = () => (dispatch) => {
   dispatch(setLoaded(false))
   axios.get(`/sneakers`).then((resp) => {
      dispatch(setSneakers(resp.data))
   })
}

export const setSneakers = (items) => ({
   type: 'SET_SNEAKERS',
   payload: items,
})

export const setLoaded = (isLoaded) => ({
   type: 'SET_LOADED',
   payload: isLoaded
})

export const setSearchName = (name) => ({
   type: 'SET_SEARCH_NAME',
   payload: name
})