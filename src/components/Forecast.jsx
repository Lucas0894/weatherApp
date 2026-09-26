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

    const hours = hourlyData.map((item) => {
        const hour = new Date(item.date).getHours()
        return hour
    })

    const maxTemp = Math.max(...temps)

    const minTemp = Math.min(...temps)

    const height = 230

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
        
        const prevPoint = points[index - 1]
        const nextPoint = points[index + 1]
        
        const controlX1 = prevPoint.x + (point.x - (index > 1 ? points[index - 2].x : prevPoint.x)) / 6
        const controlY1 = prevPoint.y + (point.y - (index > 1 ? points[index - 2].y : prevPoint.y)) / 6
        
        const controlX2 = point.x - (nextPoint ? (nextPoint.x - prevPoint.x) / 6 : 0)
        const controlY2 = point.y - (nextPoint ? (nextPoint.y - prevPoint.y) / 6 : 0)
        
        return `${acc} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${point.y}`
    }, "")

    console.log(points)


    console.log(hourlyData)

    if (!forecast) {
        return null
    }

    return (
        <div className="w-full max-w-md xl:max-w-xl p-0">
            <h3 className="text-white text-center font-semibold">Pronóstico Extendido</h3>
            <div className="flex flex-col gap-3 mt-4">
                <div className="bg-white/6 backdrop-blur-md rounded-xl border border-white/10 p-6">
                    <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">Pronóstico Horario</h4>
                    <div className="w-full overflow-x-auto pb-1">
                        <div className="min-w-[520px]">
                            <svg
                                width={width}
                                height={height}
                                viewBox={`0 0 ${width} ${height}`}
                                preserveAspectRatio="none"
                                style={{ width: "100%", height: "auto" }}
                            > 
                                <path
                                    d={path}
                                    stroke="rgb(59, 130, 246)"
                                    fill="none"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                                {points.map((point, index) => (
                                    <g key={index}>
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
                                            r="5"
                                            fill="rgb(59, 130, 246)"
                                            opacity="0.9" />
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
                                            r="2.5"
                                            fill="white" />
                                        <text
                                            x={point.x}
                                            y={point.y - 20}
                                            fill="rgb(147, 197, 253)"
                                            fontSize="15"
                                            fontWeight="600"
                                            textAnchor="middle"
                                            dominantBaseline="baseline">
                                            {Math.round(temps[index])}°
                                        </text>
                                        <text
                                            x={point.x}
                                            y={height - 12}
                                            fill="white"
                                            fontSize="12"
                                            opacity="0.6"
                                            textAnchor="middle"
                                            fontWeight="400">
                                            {hours[index]}h
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>
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