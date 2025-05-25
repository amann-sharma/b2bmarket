'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  attributes: Record<string, string | number>;
}

interface FacetValue {
  value: string | number;
  count: number;
}

interface Facets {
  [key: string]: FacetValue[];
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [facets, setFacets] = useState<Facets>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/search?${searchParams.toString()}`);
        if (!response.ok) {
          throw new Error('Search failed');
        }
        const data = await response.json();
        setListings(data.results || []);
        setFacets(data.facets || {});
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setListings([]);
        setFacets({});
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: string | number) => {
    const currentFilters = searchParams.get('filters') 
      ? JSON.parse(searchParams.get('filters')!)
      : {};
    
    const newFilters = {
      ...currentFilters,
      [key]: value
    };

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('filters', JSON.stringify(newFilters));
    router.push(`/search?${newParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="flex gap-8">
              <div className="w-64 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Search Results</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex gap-8">
          <div className="w-64 space-y-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            {Object.entries(facets).map(([key, values]) => (
              <div key={key} className="space-y-2">
                <h3 className="font-medium capitalize">{key}</h3>
                <div className="space-y-1">
                  {values.map(({ value, count }) => (
                    <label key={value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={() => handleFilterChange(key, value)}
                        checked={searchParams.get('filters') 
                          ? JSON.parse(searchParams.get('filters')!)[key] === value
                          : false}
                      />
                      <span className="text-sm">
                        {value} ({count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 space-y-4">
            {listings.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">No results found</p>
              </div>
            ) : (
              listings.map((listing) => (
                <div key={listing._id} className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                  <p className="text-gray-600 mb-4">{listing.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">${listing.price}</span>
                    <span className="text-gray-500">{listing.location}</span>
                  </div>
                  {Object.entries(listing.attributes).length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-medium mb-2">Attributes</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(listing.attributes).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="font-medium capitalize">{key}:</span>{' '}
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 