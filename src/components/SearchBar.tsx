import { useState, type ChangeEvent, type FormEvent } from "react";
import { Search } from "lucide-react";
import type { CityOption } from "../types";

type SearchBarProps = {
  onSearch: (city: string) => void | Promise<void>;
  cities: CityOption[];
  handleSelect: (city: CityOption) => void | Promise<void>;
};

export const SearchBar = ({ onSearch, cities, handleSelect }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form className="flex w-full max-w-2xl flex-col gap-2" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <Search
          className="z-10 absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
          size={18}
        />

        <input
          className="w-full rounded-xl border border-white/20 bg-white/10 p-4 pl-11 text-white placeholder-white/50 backdrop-blur-md transition focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
          value={city}
          type="text"
          placeholder="Buscar ciudad"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCity(e.target.value);
          }}
        />

        {cities && cities.length > 0 && (
          <div className="absolute top-full z-10 mt-2 flex w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
            {cities.map((c) => {
              return (
                <button
                  key={`${c.lon}, ${c.lat}`}
                  onClick={() => handleSelect(c)}
                  className="border-b border-white/10 p-3 text-left text-white transition last:border-none hover:bg-white/10"
                  type="button"
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
};
