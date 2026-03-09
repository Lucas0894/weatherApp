import { useState } from "react"

 export const SearchBar = ({onSearch, cities, handleSelect})=>{
    const [city, setCity] = useState("")


    const handleSubmit = (e)=>{
        e.preventDefault()
        onSearch(city)
    }

    return ( 
        <>
          <form className="flex flex-col w-full max-w-md gap-2" onSubmit={handleSubmit}>
          <input className='text-white border-white border flex-1 p-3 rounded-lg' value={city} type="text" placeholder='search City' onChange={(e)=>{setCity(e.target.value)}} />
          {cities && (
               cities.map((c)=>{
                   return  <button key={`${c.lon}, ${c.lat}`} onClick={()=>handleSelect(c)} className="text-white bg-blue-500 rounded-lg px-4" type="button">{c.name}</button>
               })
        )}
          </form>
        </>
    )
 }