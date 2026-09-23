import Lottie from "lottie-react"
import clear from "../animtations/clear.json"
import clouds from "../animtations/clouds.json"
import rain from "../animtations/rain.json"
import snow from "../animtations/snow.json"
import storm from "../animtations/storm.json"
import mist from "../animtations/mist.json"
import { ArrowUp, Wind, ArrowDown, Thermometer, Droplets, Gauge, Eye   } from 'lucide-react';

export const WeatherCard = ({weather, dailyForecast, forecast})=>{
    
    const weatherAnimations = {
        Clear: clear,
        Clouds: clouds,
        Rain: rain,
        Snow: snow,
        Thunderstorm: storm,
        Mist: mist
    }

    const data = dailyForecast(forecast)

    const condition = weather.weather[0].main

    return (
        <div className="w-full xl:w-2xl max-w-md xl:max-w-xl rounded-xl border border-white/10 bg-white/10 backdrop-blur-md xl:rounded-2xl p-6 xl:p-8 flex flex-col items-center gap-6 xl:gap-8 transition-all duration-300">
          <h2 className="text-white text-xl xl:text-2xl font-semibold">{weather.customName}</h2>
          <Lottie className="xl:w-[w260px]" animationData={weatherAnimations[condition]} style={{width: 200}} loop={true} />
          <p className="text-white -m-8 text-5xl xl:text-6xl font-bold">{weather.main.temp.toFixed(1)}°</p>
          <p className="text-white mt-3 capitalize font-semibold">{weather.weather[0].description}</p>
          <div className="flex -mt-6 top">
            <div className="flex p-2 gap-1">
                <Thermometer size={18} className="text-white" />
                <ArrowDown size={16} className="text-white -ml-3" />
                <p className="text-white">Min: </p>
                <p className="text-white font-semibold">{data[0].temp_min.toFixed(1)}°</p>
            </div>
          <div className="flex p-2 gap-1">
                <Thermometer className="text-white" size={18} />
                <ArrowUp className="text-white -ml-3" size={16} />
                <p className="text-white">Max: </p>
                <p className="text-white font-semibold">{data[0].temp_max.toFixed(1)}°</p>
            </div>
            </div>
            <div className="flex gap-1 -mt-6">
                <p className="text-white">Sensación:</p>
                <p className="text-white">{weather.main.feels_like}°</p>
            </div>
          <div className="grid grid-cols-2 w-full text-sm rounded-xl border border-white/10 bg-white/10 backdrop-blur-md">
            <div className="flex gap-1 border-b border-white/10 p-2">
                <Droplets className="text-white" size={18} />
                <p className="text-white">Humedad: </p>    
                <p className="text-white font-semibold">{weather.main.humidity}%</p>
            </div>
            <div className="flex gap-1 border-b border-l border-white/10 p-2">
                <Wind className="text-white" size={18} />
                <p className="text-white font-semibold">{weather.wind.speed} Km/h</p>
            </div>
            <div className="flex gap-1 p-2">
                <Gauge className="text-white" size={18} />
                <p className="text-white">Presion:</p>
                <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
            </div>
            <div className="flex gap-1 border-l border-white/10 p-2">
                <Eye className="text-white" size={18}/>
                <p className="text-white">Visibilidad:</p>
                <p className="text-white font-semibold">{weather.visibility/1000} km</p>
            </div>
            <div>

            </div>
          </div>
          </div>
    )
}