import Lottie from "lottie-react"
import clear from "../animtations/clear.json"
import clouds from "../animtations/clouds.json"
import rain from "../animtations/rain.json"
import snow from "../animtations/snow.json"
import storm from "../animtations/storm.json"
import mist from "../animtations/mist.json"

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
        <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 flex flex-col items-center gap-4">
          <h2 className="text-white text-xl font-semibold">{weather.customName}</h2>
          <Lottie animationData={weatherAnimations[condition]} style={{width: 150}} loop={true} />
          <p className="text-white text-3xl font-bold">Temp Actual: {weather.main.temp.toFixed(1)}°</p>
          <div className="flex gap-6 text-sm">
          <p className="text-white">Temp Min: {weather.main.temp_min.toFixed(1)}</p>
          <p className="text-white">Temp Max: {weather.main.temp_max.toFixed(1)}</p>
          </div>
          </div>
    )
}