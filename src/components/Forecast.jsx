import cloudy from "../assets/cloudy.png"
import rain from "../assets/rain.png"
import sun from "../assets/sun.png"
import thunderstorm from "../assets/thunderstorm.png"
import snow from "../assets/snow.png"
import mist from "../assets/mist.png"
import { CloudHail } from 'lucide-react';

export const Forecast = ({forecast, dailyForecast})=>{

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

    if(!forecast){
        return null
    }
    

    return (
        <div className="w-full xl:w-2xl max-w-md p-4">
            <h3 className="text-white text-center font-semibold">Pronostico Extendido</h3>
            <div className="flex flex-col gap-3 mt-4">
            {
                data.slice(1,5).map((day, index)=>
                    (
                        <div key={index} className="rounded-lg flex items-center justify-between p-6 bg-gray-800/70 ">
                           <img src={weatherIconMap[day.img]} width={28} inline={true} />
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