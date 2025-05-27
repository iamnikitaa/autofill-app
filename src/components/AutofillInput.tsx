// src/components/AutofillInput.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { dummyData } from '../data';
import type { DataItem } from '../data';
import { LRUCache } from '../utils/lruCache';
import { debounce } from '../utils/debounce';
import './AutofillInput.css'; // We'll create this CSS file next

const cache = new LRUCache<string, DataItem[]>(10); // Cache up to 10 items

const AutofillInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<DataItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const filterAndSetSuggestions = useCallback((query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (cache.has(normalizedQuery)) {
      console.log(`Cache hit for: "${normalizedQuery}"`);
      const cachedSuggestions = cache.get(normalizedQuery)!;
      setSuggestions(cachedSuggestions);
      setShowSuggestions(cachedSuggestions.length > 0);
      return;
    }

    console.log(`Cache miss for: "${normalizedQuery}", filtering...`);
    const filtered = dummyData.filter(item =>
      item.name.toLowerCase().includes(normalizedQuery)
    );

    cache.put(normalizedQuery, filtered);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, []);

  // Debounce the filtering function
  const debouncedFilter = useCallback(
    debounce(filterAndSetSuggestions, 300),
    [filterAndSetSuggestions]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      debouncedFilter(value);
    }
  };

  const handleSuggestionClick = (suggestionName: string) => {
    setInputValue(suggestionName);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>;
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase().trim();
    const startIndex = normalizedText.indexOf(normalizedQuery);

    if (startIndex === -1) return <span>{text}</span>;

    const endIndex = startIndex + normalizedQuery.length;

    return (
      <>
        {text.substring(0, startIndex)}
        <strong>{text.substring(startIndex, endIndex)}</strong>
        {text.substring(endIndex)}
      </>
    );
  };

  return (
    <div className="autofill-container">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue.trim() && suggestions.length > 0 && setShowSuggestions(true)}
        placeholder="Search items..."
        className="autofill-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul ref={suggestionsRef} className="suggestions-list">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.name)}
              className="suggestion-item"
            >
              {highlightMatch(suggestion.name, inputValue)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutofillInput;