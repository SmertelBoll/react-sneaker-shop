import axios from "axios"
// axios.defaults.baseURL = "http://localhost:3001"

export const fetchSneakers = () => (dispatch) => {
   dispatch(setLoaded(false))
   axios.get(`https://639a0360e916a46ec0a69694.mockapi.io/sneakers`).then((resp) => {   //http://localhost:3001
      console.log(resp)
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