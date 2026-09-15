import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Star,
  MapPin,
  CheckCircle2,
  Filter,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function MarketplacePage() {
  const { products, activeFounder, listProduct, addToCart } = useFounder();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // New product form
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Food & Beverages',
    price: 240,
    unit: 'Pack of 1',
    description: '',
    story: '',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80'
  });

  const categories = [
    'All',
    'Food & Beverages',
    'Fashion',
    'Beauty',
    'Handcrafted',
    'Agriculture',
    'Home & Lifestyle',
    'Local Products'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleListProductSubmit = async (e) => {
    e.preventDefault();
    await listProduct(newProd);
    setIsListModalOpen(false);
    setNewProd({
      name: '',
      category: 'Food & Beverages',
      price: 240,
      unit: 'Pack of 1',
      description: '',
      story: '',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
            D2C Commercial Showcase (Where Can I Sell?)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Discover brands built by ambitious founders.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Authentic, indigenous products from grassroots D2C brands across Bharat with verified founder provenance.
          </p>
        </div>

        {/* List My Product CTA */}
        <button
          onClick={() => setIsListModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>List My Product</span>
        </button>
      </div>

      {/* ---------------- Search & Categories ---------------- */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products by brand, location, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-2xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Products Grid ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-brand-300 transition-all"
          >
            <div>
              {/* Product Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {prod.badge && (
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {prod.badge}
                  </span>
                )}
                {prod.isVerified && (
                  <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" /> Verified Brand
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-brand-700">by {prod.brand}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {prod.location}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  {prod.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold pt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{prod.rating}</span>
                  <span className="text-slate-400 font-normal">({prod.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-3 pt-3">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-slate-900 font-sans">
                    ₹{prod.price}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{prod.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">{prod.unit}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProductDetails(prod)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  View Story
                </button>
                <button
                  onClick={() => handleAddToCart(prod)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    addedId === prod.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-2xs'
                  }`}
                >
                  {addedId === prod.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Added
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Product Story Modal ---------------- */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="relative h-48 bg-slate-100">
              <img
                src={selectedProductDetails.image}
                alt={selectedProductDetails.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">
                  {selectedProductDetails.category} • by {selectedProductDetails.brand}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedProductDetails.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  📍 Handcrafted in {selectedProductDetails.location}
                </p>
              </div>

              <div className="p-4 bg-brand-50/60 rounded-xl border border-brand-200/70 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800">
                  The Founder's Story
                </span>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{selectedProductDetails.story}"
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProductDetails.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-lg font-extrabold text-slate-900 font-sans">
                  ₹{selectedProductDetails.price}
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProductDetails);
                    setSelectedProductDetails(null);
                  }}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Support Founder & Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- List New Product Modal ---------------- */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-900 to-emerald-900 p-5 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Founder Marketplace
                </span>
                <h3 className="text-base font-bold text-white">List Your Product</h3>
              </div>
              <button
                onClick={() => setIsListModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleListProductSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Millet Crunch (Spiced Clusters)"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Handcrafted">Handcrafted</option>
                    <option value="Home & Lifestyle">Home & Lifestyle</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brief Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain ingredients, materials, and benefits..."
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Founder Story Behind The Product
                </label>
                <textarea
                  rows={2}
                  placeholder="How was this product born in your hometown?..."
                  value={newProd.story}
                  onChange={(e) => setNewProd({ ...newProd, story: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsListModalOpen(false)}
                  className="text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Publish to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
