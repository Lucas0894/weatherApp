import { useState } from "react"
import { Search } from "lucide-react"

 export const SearchBar = ({onSearch, cities, handleSelect})=>{
    const [city, setCity] = useState("")


    const handleSubmit = (e)=>{
        e.preventDefault()
        onSearch(city)
    }

    return ( 
        <>
          <form className="flex flex-col w-full max-w-md gap-2" onSubmit={handleSubmit}>
          <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-1/2 text-white/50" size={18} />
          <div className="relative w-full">
          <input className='w-full pl-8 text-white bg-white/10 border border-gray-500 placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/30 flex-1 p-3 rounded-lg' value={city} type="text" placeholder='Buscar ciudad' onChange={(e)=>{setCity(e.target.value)}} />
          </div>
          {cities && cities.length > 0 && (
            <div className="absolute top-full mt-2 w-full flex flex-col border border-white/20 rounded-2xl overflow-hidden">
               {cities.map((c)=>{
                   return  <button key={`${c.lon}, ${c.lat}`} onClick={()=>handleSelect(c)} className="text-white bg-white/20 border-b border-white/10 last:border-none p-2 hover:bg-white/10 transition" type="button">{c.name}</button>
               })}
               </div>
        )}
        </div>
          </form>
        </>
    )
 }