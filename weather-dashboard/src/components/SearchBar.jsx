import { useState } from "react";

export default function SearchBar({ setCity }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input);
      setInput("");
    }
  };

  return (
    // FIX 1: Added mt-4 to push it away from the window's very top edge,
    // and increased max-w-xl for a slightly wider look.
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-4 mb-8">
      {/* FIX 2: Changed rounded-full to rounded-lg for a rectangular look.
        Increased shadow for a more attractive, lifted effect. 
      */}
      <div className="flex items-center shadow-2xl rounded-lg overflow-hidden bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name, e.g., London"
          // FIX 3: Removed specific rounded-l-full/rounded-r-full to respect the parent's rounded-lg.
          // Changed focus ring to match the button color.
          className="flex-grow p-4 text-gray-800 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        />
        <button
          type="submit"
          // FIX 4: Removed rounded-r-full. Used py-4 for height and kept px-6 for width.
          // Increased hover effect for better attractiveness.
          className="bg-blue-600 text-white px-6 py-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out font-semibold"
        >
          Search
        </button>
      </div>
    </form>
  );
}