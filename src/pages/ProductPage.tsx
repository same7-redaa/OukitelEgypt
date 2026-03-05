import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ShoppingCart, Star, ShieldCheck, Truck, ChevronRight, Zap, CheckCircle2, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductPage({ addToCart }: { addToCart: (p: any, qty: number) => void }) {
    const { productId } = useParams();
    const product = products.find(p => p.id === Number(productId));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen bg-[var(--color-lighter)] flex items-center justify-center text-gray-900 pt-24 text-2xl font-bold">
                المنتج غير موجود
                <Link to="/" className="text-[var(--color-brand)] mr-4 underline text-lg">العودة للرئيسية</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="min-h-screen bg-[var(--color-lighter)] text-gray-900">

            <div className="pt-28"></div>

            {/* Product Layout - full width, no card */}
            <div className="flex flex-col lg:flex-row min-h-[70vh]">

                {/* Left - Product Image, full height */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="lg:w-1/2 relative overflow-hidden bg-gray-100"
                    style={{ minHeight: '60vh', borderRadius: '10px' }}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover absolute inset-0"
                    />
                    {/* Rating badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-gray-900 border border-gray-200 shadow-md flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {product.rating}
                    </div>
                    <div className="absolute top-6 right-6 bg-[var(--color-brand)]/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-white shadow-md">
                        {product.category}
                    </div>
                </motion.div>

                {/* Right - Product Details */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:w-1/2 px-8 lg:px-16 py-16 flex flex-col justify-center bg-white"
                >
                    <h1 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900 leading-tight">
                        {product.name}
                    </h1>
                    <p className="text-4xl font-black text-[var(--color-brand)] mb-6">
                        {product.price} <span className="text-xl font-medium text-gray-400">ج.م</span>
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg mb-10 border-b border-gray-100 pb-10">
                        {product.description}
                    </p>

                    {/* Features */}
                    <h3 className="font-black text-gray-900 mb-5 text-lg">المميزات الرئيسية</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                        {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-brand)] shrink-0" />
                                <span className="font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Quantity + Add to Cart */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center bg-gray-100 rounded-2xl p-2 gap-3">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-600 hover:bg-[var(--color-brand)] hover:text-white transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-xl font-black text-gray-900 w-10 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-600 hover:bg-[var(--color-brand)] hover:text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white h-16 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-[var(--color-brand)]/20 flex items-center justify-center gap-3"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            إضافة إلى السلة
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex gap-6 mt-10 pt-10 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-semibold">منتج أصلي 100%</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Truck className="w-5 h-5 text-blue-500" />
                            <span className="text-sm font-semibold">توصيل سريع</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Zap className="w-5 h-5 text-[var(--color-brand)]" />
                            <span className="text-sm font-semibold">جودة مضمونة</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Product Gallery - full width edge to edge */}
            <div className="py-16">
                <div className="flex flex-col gap-4">
                    {[
                        '/Oukitel-Mate-Max-4.jpg',
                        '/Oukitel-Mate-Clear-1.jpg',
                        '/Oukitel-Mate-Max-5.jpg',
                    ].map((imgSrc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12 }}
                            style={{ height: '500px' }}
                            className="w-full overflow-hidden"
                        >
                            <img
                                src={imgSrc}
                                alt={`${product.name} - صورة ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
