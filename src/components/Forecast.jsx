import cloudy from "../animtations/clouds.json"
import rain from "../animtations/rain.json"
import sun from "../animtations/clear.json"
import thunderstorm from "../animtations/storm.json"
import snow from "../animtations/snow.json"
import mist from "../animtations/mist.json"
import { CloudHail } from 'lucide-react';
import Lottie from "lottie-react"

export const Forecast = ({ forecast, dailyForecast }) => {

    const weatherIconMap = {
        Clear: sun,
        Clouds: cloudy,
        Rain: rain,
        Thunderstorm: thunderstorm,
        Snow: snow,
        Mist: mist
    };

    const data = dailyForecast(forecast)
    console.log(data)

    if (!forecast) {
        return null
    }


    return (
        <div className="w-full xl:w-2xl max-w-md p-4">
            <h3 className="text-white text-center font-semibold">Pronostico Extendido</h3>
            <div className="flex flex-col gap-3 mt-4">
                {
                    data.slice(1, 5).map((day, index) =>
                    (
                        <div key={index} className="flex items-center justify-between p-6 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md ">
                            <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                                <Lottie
                                    animationData={weatherIconMap[day.img]}
                                    loop
                                    autoplay
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                            <div className="relative flex flex-col justify-center  w-24">
                                <p className="text-white ">{new Date(day.date).toLocaleDateString("es-ES", { weekday: "long" })}</p>
                                <div className="absolute top-full flex items-center gap-1 text-blue-400">
                                    <CloudHail className="mt-1" size={16} />
                                    <span className="text-sm">{Math.round(day.pop * 100)}%</span>
                                </div>
                            </div>
                            <p className="text-white ml-1 text-center text-sm">{day.temp_min.toFixed(1)}°</p>
                            <div className="text-white text-sm">/</div>
                            <p className="text-red-500 ml-1 text-center text-sm">{day.temp_max.toFixed(1)}°</p>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}