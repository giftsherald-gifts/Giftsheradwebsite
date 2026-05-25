'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  featured?: boolean;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, onAddToCart, onAddToWishlist, featured = false }, ref) => {
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const discount = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`group relative overflow-hidden rounded-xl shadow-premium transition-all duration-300 hover:shadow-premium-lg ${
          featured ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''
        }`}
      >
        {/* Image Container */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-ivory-dark">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-ivory-dark via-ivory to-ivory-dark animate-shimmer" />
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-3 right-3 bg-gold text-soft-black px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
            >
              -{discount}%
            </motion.div>
          )}

          {/* Stock Badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-ivory text-lg font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-end justify-center pb-4 gap-3"
          >
            <button
              onClick={() => {
                setIsFavorite(!isFavorite);
                onAddToWishlist?.(product);
              }}
              className={`p-3 rounded-full transition-all duration-300 ${
                isFavorite
                  ? 'bg-gold text-soft-black'
                  : 'bg-ivory text-soft-black hover:bg-gold'
              }`}
              aria-label="Add to wishlist"
            >
              <FiHeart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={() => onAddToCart?.(product)}
              disabled={!product.inStock}
              className="flex-1 bg-forest-green text-ivory px-4 py-3 rounded-lg font-medium hover:bg-forest-green-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FiShoppingCart size={18} />
              Add to Cart
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-soft-black/60 uppercase tracking-wide mb-2">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="text-lg font-serif font-bold text-soft-black mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  className={i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-soft-black/60">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-forest-green">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-soft-black/50 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.occasion.slice(0, 2).map((occ) => (
              <span
                key={occ}
                className="inline-block px-2 py-1 bg-ivory-dark text-xs rounded text-soft-black/70"
              >
                {occ}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductCard.displayName = 'ProductCard';
