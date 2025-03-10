import { FaHistory, FaSearch } from "react-icons/fa";

// New component: SearchSuggestions.tsx
interface SearchSuggestionsProps {
  query: string;
  searchHistory: string[];
  onSelect: (value: string) => void;
  onClearHistory: () => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  searchHistory,
  onSelect,
  onClearHistory
}) => {
  if (!query && !searchHistory.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      {query && (
        <div className="p-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FaSearch className="mr-2 h-4 w-4" />
            Search for "{query}"
          </div>
        </div>
      )}
      
      {searchHistory.length > 0 && (
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Recent Searches</span>
            <button
              onClick={onClearHistory}
              className="text-xs text-red-500 hover:text-red-600"
            >
              Clear All
            </button>
          </div>
          {searchHistory.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelect(item)}
              className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
            >
              <div className="flex items-center">
                <FaHistory className="mr-2 h-4 w-4 text-gray-400" />
                {item}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};