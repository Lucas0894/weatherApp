import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { geocoding, getForecast, getWeather } from './services/weatherservice.js'
import { Forecast } from './components/Forecast'
import sun from "./assets/sun.png"

function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
  const [cities, setCities] = useState([])
  const [forecast, setForecast] = useState(null)

  const handleSearch = async (city) => {
    if (!city.trim()) {
      return
    }
    setWeather(null)
    setLoader(true)
    try {
      const response = await geocoding(city)
      setError(null)
      setCities(response)
    } catch (error) {
      setError('Ciudad no encontrada')
    } finally {
      setLoader(false)
    }
  }

  const dailyForecast = (fore) => {
    const result = {}
    fore.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]
      if (!result[date]) {
        result[date] = {
          date,
          img: item.weather[0].main,
          pop: item.pop,
          max: item.main.temp_max,
          min: item.main.temp_min
        }
      } else {
        result[date].min = Math.min(result[date].min, item.main.temp_min)
        result[date].max = Math.max(result[date].max, item.main.temp_max)
      }
    })
    return Object.entries(result).map(([date, temps]) => ({
      date,
      pop: temps.pop,
      img: temps.img,
      temp_min: temps.min,
      temp_max: temps.max

    }))
  }


  const handleSelect = async (city) => {
    try {
      const response = await getWeather(city.lat, city.lon)
      const getExtended = await getForecast(city.lat, city.lon)
      response.customName = `${city.name}`
      setWeather(response)
      setForecast(getExtended)
    } catch (error) {
      setError("No se encontro lo seleccionado")
    } finally {
      setCities([])
    }
  }

  console.log(forecast)


  const bgGray = "bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900"

  return (
    <div className={`min-h-dvh relative ${bgGray}`}>

      <div className="fixed inset-0 -z-10 bg-white/10 backdrop-blur-3xl" />

      <div className="flex flex-col items-center gap-6 p-6">

        {!weather && !loader && !error && (
          <div className="flex w-full max-w-4xl flex-col items-center text-center">

            <h1 className="mt-10 text-4xl font-bold text-white md:text-5xl">
              Weather <span className="text-violet-400">App</span>
            </h1>

            <p className="mt-3 max-w-xl text-base text-white/80 md:text-lg">
              Consultá el clima actual y el pronóstico de los próximos días
              en cualquier ciudad del mundo.
            </p>

            <div className="mt-8 flex w-full justify-center">
              <SearchBar
                onSearch={handleSearch}
                cities={cities}
                handleSelect={handleSelect}
              />
            </div>

            <div className="mt-8 h-56 w-56">
              <img src={sun} alt="weather" />
            </div>

            <p className="text-sm text-white/70">
              Buscá una ciudad para conocer su clima
            </p>

            <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <h3 className="font-semibold text-white">
                  Temperatura
                </h3>

                <p className="mt-1 text-sm text-white/60">
                  Conocé la temperatura actual
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <h3 className="font-semibold text-white">
                  Pronóstico
                </h3>

                <p className="mt-1 text-sm text-white/60">
                  Mirá el clima de los próximos días
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <h3 className="font-semibold text-white">
                  Condiciones
                </h3>

                <p className="mt-1 text-sm text-white/60">
                  Humedad, viento y más
                </p>
              </div>

            </div>
          </div>
        )}


        {weather && (
          <div className="flex w-full justify-center">
            <SearchBar
              onSearch={handleSearch}
              cities={cities}
              handleSelect={handleSelect}
            />
          </div>
        )}

        {loader && (
          <h3 className="text-white">
            Buscando ciudad...
          </h3>
        )}

        {error && (
          <h3 className="text-white">
            {error}
          </h3>
        )}


        {weather && !loader && !error && (
          <div className="flex flex-col xl:flex-row">

            <div className="flex-1">
              <WeatherCard
                weather={weather}
                forecast={forecast}
                dailyForecast={dailyForecast}
              />
            </div>

            {forecast && (
              <div className="flex-1">
                <Forecast
                  forecast={forecast}
                  dailyForecast={dailyForecast}
                />
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}

export default App
