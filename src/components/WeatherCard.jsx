import Lottie from "lottie-react"
import clear from "../animtations/clear.json"
import clouds from "../animtations/clouds.json"
import rain from "../animtations/rain.json"
import snow from "../animtations/snow.json"
import storm from "../animtations/storm.json"
import mist from "../animtations/mist.json"
import drizzle from "../animtations/drizzle.json"
import colder from "../animtations/colder.json"
import heat from "../animtations/heat.json"
import { Wind, Droplets, Gauge, Eye } from "lucide-react"

export const WeatherCard = ({ weather, dailyForecast, forecast }) => {
    const weatherAnimations = {
        Clear: clear,
        Clouds: clouds,
        Rain: rain,
        Snow: snow,
        Thunderstorm: storm,
        Mist: mist,
        Drizzle: drizzle
    }

    const data = dailyForecast(forecast)
    const condition = weather.weather[0].main

    return (
        <div className="w-full max-w-md xl:max-w-2xl rounded-2xl border border-white/10 bg-white/6 backdrop-blur-md p-6 xl:p-8 flex flex-col items-center gap-6 xl:gap-8 transition-all duration-300">
            <h2 className="text-white text-xl xl:text-2xl font-semibold">{weather.customName}</h2>

            <div className="w-52 h-52 flex items-center justify-center">
                <Lottie animationData={weatherAnimations[condition]} loop autoplay style={{ width: "200px", height: "200px" }} />
            </div>

            <p className="text-white text-5xl xl:text-6xl font-bold">{weather.main.temp.toFixed(1)}°</p>

            <p className="text-white/80 capitalize font-semibold -mt-3">{weather.weather[0].description}</p>

            <div className="flex items-center justify-center gap-4 -mt-4">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-white/8 flex items-center justify-center">
                        <Lottie animationData={colder} loop autoplay style={{ width: "40px", height: "40px" }} />
                    </div>
                    <p className="text-white/70">Min:</p>
                    <p className="text-white font-semibold">{data[0].temp_min.toFixed(1)}°</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-white/8 flex items-center justify-center">
                        <Lottie animationData={heat} loop autoplay style={{ width: "40px", height: "40px" }} />
                    </div>
                    <p className="text-white/70">Max:</p>
                    <p className="text-white font-semibold">{data[0].temp_max.toFixed(1)}°</p>
                </div>
            </div>

            <div className="flex gap-1 -mt-3">
                <p className="text-white/60">Sensación:</p>
                <p className="text-white font-semibold">{weather.main.feels_like.toFixed(1)}°</p>
            </div>

            <div className="grid grid-cols-2 w-full text-sm xl:text-base rounded-xl border border-white/10 bg-white/4 backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-1 border-b border-white/10 p-4">
                    <Droplets className="text-white/70" size={18} />
                    <p className="text-white/60">Humedad:</p>
                    <p className="text-white font-semibold">{weather.main.humidity}%</p>
                </div>

                <div className="flex items-center gap-1 border-b border-l border-white/10 p-4">
                    <Wind className="text-white/70" size={18} />
                    <p className="text-white/60">Viento:</p>
                    <p className="text-white font-semibold">{weather.wind.speed} Km/h</p>
                </div>

                <div className="flex items-center gap-1 border-l border-white/10 p-4">
                    <Gauge className="text-white/70" size={18} />
                    <p className="text-white/60">Presión:</p>
                    <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
                </div>

                <div className="flex items-center gap-1 border-l border-white/10 p-4">
                    <Eye className="text-white/70" size={18} />
                    <p className="text-white/60">Visibilidad:</p>
                    <p className="text-white font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
            </div>
        </div>
    )
}

