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
          <input className='w-full pl-8 text-white bg-white/10 border-white/20 placeholder-white/50 border flex-1 p-3 rounded-lg' value={city} type="text" placeholder='Search City' onChange={(e)=>{setCity(e.target.value)}} />
          </div>
          {cities && (
               cities.map((c)=>{
                   return  <button key={`${c.lon}, ${c.lat}`} onClick={()=>handleSelect(c)} className="text-white bg-blue-500 rounded-lg px-4" type="button">{c.name}</button>
               })
        )}
          </form>
        </>
    )
 }