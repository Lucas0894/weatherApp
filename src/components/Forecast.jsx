import cloudy from "../assets/cloudy.png"
import rain from "../assets/rain.png"
import sun from "../assets/sun.png"
import thunderstorm from "../assets/thunderstorm.png"
import snow from "../assets/snow.png"
import mist from "../assets/mist.png"

export const Forecast = ({forecast})=>{

const weatherIconMap = {
  Clear: sun,
  Clouds: cloudy,
  Rain: rain,
  Drizzle: "solar:cloud-rain-bold",
  Thunderstorm: thunderstorm,
  Snow: snow,
  Mist: mist
};


    if(!forecast){
        return null
    }

    const daily = forecast.list.filter((item)=>{
        return item.dt_txt.includes("12:00:00")
    })
    console.log(daily)

    return (
        <div className="w-full max-w-md p-4">
            <h3 className="text-white text-center font-semibold">Pronostico Extendido 5 dias</h3>
            <div className="flex flex-col gap-3 mt-4">
            {
                daily.map((day, index)=>
                    (
                        <div key={index} className="rounded-lg flex items-center justify-between p-4 bg-gray-800/70 ">
                           <img src={weatherIconMap[day.weather[0].main]} width={28} inline={true} />
                           <p className="text-white w-24">{new Date(day.dt_txt).toLocaleDateString("es-ES", { weekday: "long" })}</p>
                           <p className="text-white ml-2 text-center">{day.main.temp_min.toFixed(1)}°</p>
                           <p className="text-white ml-2 text-center">{day.main.temp_max.toFixed(1)}°</p>
                        </div>
                    )
                )
            }
            </div>
        </div>
    )
}