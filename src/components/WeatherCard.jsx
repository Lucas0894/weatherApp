import Lottie from "lottie-react"
import clear from "../animtations/clear.json"
import clouds from "../animtations/clouds.json"
import rain from "../animtations/rain.json"
import snow from "../animtations/snow.json"
import storm from "../animtations/storm.json"
import mist from "../animtations/mist.json"
import { ArrowUp, Wind, ArrowDown, Thermometer, Droplets } from 'lucide-react';

export const WeatherCard = ({weather})=>{
    console.log(weather)

    const weatherAnimations = {
        Clear: clear,
        Clouds: clouds,
        Rain: rain,
        Snow: snow,
        Thunderstorm: storm,
        Mist: mist
    }

    const condition = weather.weather[0].main

    return (
        <div className="w-full max-w-md bg-slate-800/70  rounded-xl p-6 flex flex-col items-center gap-4 transition-all duration-300">
          <h2 className="text-white text-xl font-semibold">{weather.customName}</h2>
          <Lottie animationData={weatherAnimations[condition]} style={{width: 150}} loop={true} />
          <p className="text-white text-3xl font-bold">{weather.main.temp.toFixed(1)}°</p>
          <p className="text-white capitalize font-semibold">{weather.weather[0].description}</p>
          <div className="flex flex-col w-full text-sm rounded-md bg-slate-800/70 backdrop-blur">
            <div className="flex gap-2 border-b border-white/10 p-2">
                <Droplets className="text-white" size={18} />
                <p className="text-white">Humedad: </p>    
                <p className="text-white font-semibold">{weather.main.humidity}%</p>
            </div>
            <div className="flex gap-2 border-b border-white/10 p-2">
                <Wind className="text-white" size={18} />
                <p className="text-white">Viento: </p>
                <p className="text-white font-semibold">{weather.wind.speed} Km/h</p>
            </div>
            <div className="flex gap-2 border-b border-white/10 p-2">
                <Thermometer className="text-white" size={18} />
                <ArrowUp className="text-white -ml-3" size={16} />
                <p className="text-white">Max: </p>
                <p className="text-white font-semibold">{weather.main.temp_max.toFixed(1)}°</p>
            </div>
            <div className="flex gap-2 p-2">
                <Thermometer size={18} className="text-white" />
                <ArrowDown size={16} className="text-white -ml-3" />
                <p className="text-white">Min: </p>
                <p className="text-white font-semibold">{weather.main.temp_min.toFixed(1)}°</p>
            </div>
          </div>
          </div>
    )
}