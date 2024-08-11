import axios from "axios"
// import { ApiKey } from '../constants/index'
const ApiKey = '6bc1a724f89c4874af583610242806'

const urlMeteo = params => `https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${params.nom}&days=7&aqi=no&alerts=no`
const urllocation = params => `https://api.weatherapi.com/v1/search.json?key=${ApiKey}&q=${params.nom}`
const urlDay = params => `https://api.weatherapi.com/v1/marine.json?key=${ApiKey}&q=${params.nom}&days=1`
const urlDay1 = params => `http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${params.nom}&days=1&aqi=no&alerts=no`
const test = `https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=Fianar&days=1&aqi=no&alerts=no`
//http://api.weatherapi.com/v1/forecast.json?key=d956167cc7694e9995225735241306&q=Fianarantsoa&days=7&aqi=no&alerts=no

const apiCall = async (url) => {
    const options = {
        method : 'GET',
        url : url
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log('ApiCall error', error)
    }
}

export const fetchMeteo = params => {
    return apiCall(urlMeteo(params))
}

export const fetchLocation = params => {
    return apiCall(urllocation(params))
}
export const fetchDay = params => {
    return apiCall(urlDay1(params))
}

export const getLoc = async ()  => {
    const response = await axios.get(test)
    console.log(response.data)
}