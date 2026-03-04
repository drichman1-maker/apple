import React from 'react'
import { Search as SearchIcon, Command } from 'lucide-react'

const SearchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-gray-400 hover:text-white hover:border-[#444] transition-all text-sm"
    >
      <SearchIcon className="h-4 w-4" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:flex items-center gap-0.5 ml-2 px-1.5 py-0.5 bg-[#262626] border border-[#404040] rounded text-xs">
        <Command className="h-2.5 w-2.5" />
        <span>K</span>
      </kbd>
    </button>
  )
}

export default SearchButton