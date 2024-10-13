import { FaSearch } from 'react-icons/fa'
import { useRef } from 'react'

export default function SearchInput({ placeholder = 'Search...', value, onChange }) {
  const inputRef = useRef(null)

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative flex items-center w-full">
      <FaSearch
        className="absolute left-3 text-gray-500 dark:text-gray-300 cursor-pointer"
        onClick={handleIconClick}  
      />
      <input
        ref={inputRef}
        type="text"
        className="pl-10 pr-4 py-2 w-full text-sm rounded bg-gray-200 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
