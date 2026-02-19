import { Product } from '@/types';
import { ExternalLink, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Calculate price trend
    let trend = 'same';
    let diff = 0;

    if (product.priceHistory && product.priceHistory.length > 0) {
        // History includes current price? Implementation detail. 
        // Assuming backend returns history sorted descending by date.
        // Index 0 might be current or previous check.
        // Let's assume the last distinct price is checking against index 0 if it exists.

        // Simple logic: Compare current price with the most recent DIFFERENT price in history
        const previous = product.priceHistory.find(h => Math.abs(h.precio - product.precio_actual) > 0.01);

        if (previous) {
            if (product.precio_actual < previous.precio) {
                trend = 'down';
                diff = ((previous.precio - product.precio_actual) / previous.precio) * 100;
            } else if (product.precio_actual > previous.precio) {
                trend = 'up';
                diff = ((product.precio_actual - previous.precio) / previous.precio) * 100;
            }
        }
    }

    // Fallback image if none provided
    const imageUrl = product.imagen || 'https://via.placeholder.com/400x300?text=No+Image';

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-900/20 transition-all border border-gray-700 group hover:border-gray-600 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                {/* We use standard img tag for external URLs to avoid Next.js config complexity for now, or use Next Image if domains are configured */}
                <img
                    src={imageUrl}
                    alt={product.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                {/* Trend Badge */}
                {trend !== 'same' && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg ${trend === 'down' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                        }`}>
                        {trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                        {diff.toFixed(0)}%
                    </div>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-gray-700/50 text-gray-400 rounded text-[10px] uppercase tracking-wider font-semibold border border-gray-700">
                            {product.tienda}
                        </span>
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-400 transition-colors"
                        >
                            <ExternalLink size={18} />
                        </a>
                    </div>

                    <h3 className="font-semibold text-gray-200 line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors" title={product.nombre}>
                        {product.nombre}
                    </h3>
                </div>

                <div className="pt-4 border-t border-gray-700/50 flex items-end justify-between">
                    <div className="space-y-0.5">
                        <p className="text-xs text-gray-500 font-medium">Precio Actual</p>
                        <p className="text-2xl font-bold text-white tracking-tight">
                            ${product.precio_actual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] text-gray-500">
                            Last check: {new Date(product.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
