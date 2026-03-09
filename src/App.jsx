import { useState } from 'react'
import { getWeather } from './services/weatherservice'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { geocoding } from './services/weatherservice'

function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
  const [cities, setCities] = useState([])

 const handleSearch = async (city)=>{
   if(!city.trim()){
    return
   }
   setWeather(null)
   setLoader(true)
   try {
    const response = await geocoding(city)
    console.log(response)
    setError(null)
    setCities(response)
  } catch (error) {
    setError('Ciudad no encontrada')
  }finally{
    setLoader(false)
  }
 }

 const handleSelect = async (city)=>{
  try {
    const response = await getWeather(city.lat, city.lon)
    console.log(response)
    response.customName = `${city.name}`
    setWeather(response)
  } catch (error) {
    setError("No se encontro lo seleccionado")
  }finally{
    setCities([])
  }
 }


 

 const getBackground = ()=>{
  if(!weather){
    return "bg-slate-900"
  }
  const bg = weather.weather[0].main
  switch (bg) {

    case "Clear":
      return "bg-gradient-to-br from-yellow-300 to-orange-400"
    case "Clouds":
      return "bg-gradient-to-br from-gray-400 to-gray-700"
    case "Rain":
      return "bg-blue-600"
    case "Snow":
      return "bg-cyan-200"
    case "Thunderstorm":
      return "bg-purple-700"
  
    default:
      return "bg-slate-900"
  }
 }

 console.log(weather)

  return (
    <div className={`min-h-screen ${getBackground()} flex flex-col items-center gap-6 p-6`}>
      <h1 className='text-white text-3xl font-bold'>App Clima</h1>
      <SearchBar onSearch={handleSearch} cities={cities} handleSelect={handleSelect} />
      {loader && <h3 className='text-white'>Buscando ciudad</h3>}
      {error && <h3 className='text-white'>{error}</h3>}
      {
        weather && !loader && !error && (
          <WeatherCard weather={weather}  />
        )
      }
    </div>
  )
}

export default App
