'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/types';
import { RefreshCw, Plus, AlertCircle } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCheckProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;

    setChecking(true);
    setError(null);
    try {
      await axios.post(`${apiUrl}/check-product`, { url: urlInput });
      setUrlInput('');
      fetchProducts(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to check product');
    } finally {
      setChecking(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ArbiBot
            </h1>
            <p className="text-gray-400 mt-2">Arbitrage & Price Monitoring Dashboard</p>
          </div>
          <button
            onClick={fetchProducts}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-6 h-6 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Input Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <form onSubmit={handleCheckProduct} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-gray-400">
                Track New Product
              </label>
              <input
                id="url"
                type="text"
                placeholder="Paste MercadoLibre URL (or use 'http://test.com/mock' to test)"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={checking || !urlInput}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
            >
              {checking ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {checking ? 'Checking...' : 'Track'}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {products.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center text-gray-500 bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-700/50 flex flex-col items-center justify-center gap-4">
              <div className="p-4 bg-gray-800 rounded-full">
                <Plus className="w-8 h-8 opacity-50" />
              </div>
              <div>
                <p className="text-xl font-medium text-gray-400">No products tracked yet</p>
                <p className="text-sm mt-1 text-gray-600">Paste a MercadoLibre URL above to start monitoring.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
