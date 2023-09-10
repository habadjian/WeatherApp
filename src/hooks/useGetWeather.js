import React, { useState, useEffect } from 'react'

import * as Location from 'expo-location'
import { WEATHER_API_KEY } from '@env'

export const useGetWeather = () => {
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState([])
  const [lat, setLat] = useState([])
  const [long, setLong] = useState([])

  const fetchWeatherData = async () => {
    try{
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=imperial`
      )
      const data = await res.json()
      setWeather(data)
    } catch(error) {
        setError('Could not fetch weather')
    } finally {
      setLoading(false)
    }
    
  }
  
  useEffect(() => {
    (async() => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted') {
        setError('permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLat(location.coords.latitude)
      setLong(location.coords.longitude)
      await fetchWeatherData()
    })()
  }, [lat, long])
  return [loading, error, weather]
}