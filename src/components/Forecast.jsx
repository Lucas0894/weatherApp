import cloudy from "../animtations/clouds.json"
import rain from "../animtations/rain.json"
import sun from "../animtations/clear.json"
import thunderstorm from "../animtations/storm.json"
import snow from "../animtations/snow.json"
import mist from "../animtations/mist.json"
import Lottie from "lottie-react"
import raindrop from "../animtations/raindrop.json"

export const Forecast = ({ forecast, dailyForecast }) => {

    const weatherIconMap = {
        Clear: sun,
        Clouds: cloudy,
        Rain: rain,
        Thunderstorm: thunderstorm,
        Snow: snow,
        Mist: mist
    }

    const data = dailyForecast(forecast)
    console.log(forecast)

    const hourlyForecast = forecast.list.map((item) => {
        return {
            date: item.dt_txt,
            temp: item.main.temp
        }
    })

    const hourlyData = hourlyForecast.slice(0, 8)

    const temps = hourlyData.map((item) => item.temp)

    const maxTemp = Math.max(...temps)

    const minTemp = Math.min(...temps)

    const height = 200

    const width = 500

    const padding = 30

    const points = temps.map((temp, index) => {
        const x = padding + (index / (temps.length - 1)) * (width - padding * 2)
        const y = height - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (height - padding * 2)
        return { x, y }
    })

    const path = points.reduce((acc, point, index) => {
        if (index === 0) {
            return `M ${point.x} ${point.y}`
        }

        const previous = points[index - 1]

        const midX = (previous.x + point.x) / 2
        const midY = (previous.y + point.y) / 2

        return ` ${acc} Q ${previous.x} ${previous.y}, ${midX} ${midY} `
    }, "")

    const lastPoint = points[points.length - 1]
    const finalPoint = `${path} T ${lastPoint.x} ${lastPoint.y}`

    console.log(points)


    console.log(hourlyData)

    if (!forecast) {
        return null
    }

    return (
        <div className="w-full max-w-md xl:max-w-xl p-0">
            <h3 className="text-white text-center font-semibold">Pronóstico Extendido</h3>
            <div className="flex flex-col gap-3 mt-4">
                
                {
                    data.slice(1, 5).map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-5 rounded-xl border border-white/10 bg-white/6 backdrop-blur-md">

                            <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                                <Lottie
                                    animationData={weatherIconMap[day.img]}
                                    loop
                                    autoplay
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-24">
                                <p className="text-white capitalize">{new Date(day.date).toLocaleDateString("es-ES", { weekday: "long" })}</p>

                                <div className="flex items-center gap-1 text-blue-400">
                                    <div className="h-7 w-7 flex items-center justify-center">
                                        <Lottie
                                            animationData={raindrop}
                                            loop
                                            autoplay
                                            style={{ width: "30px", height: "30px" }}
                                        />
                                    </div>
                                    <span className="text-sm">{Math.round(day.pop * 100)}%</span>
                                </div>
                            </div>

                            <p className="text-white/70 ml-1 text-center text-sm">{day.temp_min.toFixed(1)}°</p>

                            <div className="text-white/40 text-sm">/</div>

                            <p className="text-white ml-1 text-center text-sm font-semibold">{day.temp_max.toFixed(1)}°</p>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}