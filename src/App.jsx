import { useState } from 'react'
import { getForecast, getWeather } from './services/weatherservice'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { geocoding } from './services/weatherservice'
import { Forecast } from './components/Forecast'


function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
  const [cities, setCities] = useState([])
  const [forecast, setForecast] = useState(null)

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

 const dailyForecast = (fore) =>{
            const result = {}
            fore.list.forEach((item)=>{
                const date = item.dt_txt.split(" ")[0]
                if(!result[date]){
                    result[date] = {
                        date, 
                        img: item.weather[0].main,
                        pop: item.pop,
                        max : item.main.temp_max,
                        min : item.main.temp_min
                    }
                } else{
                    result[date].min = Math.min(result[date].min, item.main.temp_min)
                    result[date].max = Math.max(result[date].max, item.main.temp_max)
                }
            })
            return Object.entries(result).map(([date, temps])=> ({
                date,
                pop: temps.pop,
                img: temps.img,
                temp_min: temps.min,
                temp_max: temps.max
                
            }))
        }
        
        

 console.log(forecast)

 const handleSelect = async (city)=>{
  try {
    const response = await getWeather(city.lat, city.lon)
    const getExtended = await getForecast(city.lat, city.lon)
    console.log(response)
    response.customName = `${city.name}`
    setWeather(response)
    setForecast(getExtended)
  } catch (error) {
    setError("No se encontro lo seleccionado")
  }finally{
    setCities([])
  }
 }

 const bgGray = "bg-gradient-to-br from-[#2b2e4a] via-[#3a3f6b] to-[#5a5f9f]"

 console.log(weather)

  return (
    <div className={`min-h-screen ${bgGray} flex flex-col items-center gap-6 p-6`}>    
      <SearchBar onSearch={handleSearch} cities={cities} handleSelect={handleSelect} />
      {loader && <h3 className='text-white'>Buscando ciudad</h3>}
      {error && <h3 className='text-white'>{error}</h3>}
      {
        weather && !loader && !error && (
          <WeatherCard weather={weather} forecast={forecast} dailyForecast={dailyForecast} />
        )
      }
      {
        forecast && weather && (
          <Forecast forecast={forecast} dailyForecast={dailyForecast} />
        )
      }
    </div>
  )
}

export default App
