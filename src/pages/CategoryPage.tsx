import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ChevronRight, ShoppingCart, Star, Home } from 'lucide-react';
import { motion } from 'motion/react';

// Map each category to a hero background image and accent color
const categoryHeroMap: Record<string, { image: string; color: string; colorDark: string }> = {
    devices: {
        image: '/Oukitel-Mate-Max-4.jpg',
        color: '#1d4ed8',
        colorDark: '#1e3a8a',
    },
    disposables: {
        image: '/Oukitel-Mate-Clear-1.jpg',
        color: '#FF4E00',
        colorDark: '#CC3E00',
    },
    cartridges: {
        image: '/Oukitel-Mate-Max-5.jpg',
        color: '#059669',
        colorDark: '#047857',
    },
    coils: {
        image: '/Oukitel-Mate-Max-4.jpg',
        color: '#7c3aed',
        colorDark: '#5b21b6',
    },
};

export default function CategoryPage({ addToCart }: { addToCart: (p: any, qty: number) => void }) {
    const { categoryId } = useParams();

    const category = categories.find(c => c.id === categoryId) ||
        categories.find(c => c.name.toLowerCase() === categoryId?.toLowerCase());

    const categoryProducts = products.filter(p => p.categoryId === category?.id);
    const hero = categoryHeroMap[category?.id ?? ''] || {
        image: '/Oukitel-Mate-Clear-1.jpg',
        color: '#FF4E00',
        colorDark: '#CC3E00',
    };

    if (!category) {
        return (
            <div className="min-h-screen bg-[var(--color-lighter)] flex flex-col items-center justify-center text-gray-900 pt-24 gap-6">
                <p className="text-2xl font-black">القسم غير موجود</p>
                <Link to="/" className="bg-[var(--color-brand)] text-white px-6 py-3 rounded-full font-bold shadow hover:bg-[var(--color-brand-dark)] transition-colors">
                    العودة للرئيسية
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-lighter)] text-gray-900">

            {/* ── Hero Section ── */}
            <section className="relative min-h-[55vh] flex items-end overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={hero.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-0" style={{
                    background: `linear-gradient(to top, ${hero.colorDark}ee 0%, ${hero.color}88 50%, transparent 100%)`
                }} />

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 z-0 bg-black/30" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-white/70 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                            {category.name}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                            {category.arabicName}
                        </h1>
                        <p className="text-white/85 text-lg max-w-xl leading-relaxed">
                            استكشف مجموعتنا المتميزة من {category.arabicName} الأصلية بتجربة فيب رائعة وجودة مضمونة.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-3 text-white text-sm font-semibold">
                                🛡️ منتجات أصلية 100%
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-3 text-white text-sm font-semibold">
                                🚚 توصيل لجميع محافظات مصر
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-5 py-3 text-white text-sm font-semibold">
                                ✨ {categoryProducts.length} منتج متاح
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Products Grid ── */}
            <section className="py-20 bg-[var(--color-lighter)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                            منتجات <span style={{ color: hero.color }}>{category.arabicName}</span>
                        </h2>
                        <Link to="/" className="text-gray-500 hover:text-[var(--color-brand)] transition-colors text-sm font-medium flex items-center gap-1">
                            <Home className="w-4 h-4" /> الرئيسية
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryProducts.length > 0 ? (
                            categoryProducts.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all group flex flex-col"
                                >
                                    <Link to={`/product/${product.id}`} className="block relative h-64 overflow-hidden bg-gray-100">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-gray-200 shadow-sm" style={{ color: hero.color }}>
                                            {category.name}
                                        </div>
                                    </Link>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <Link to={`/product/${product.id}`}>
                                                <h3 className="text-lg font-bold line-clamp-1 text-gray-900 hover:text-[var(--color-brand)] transition-colors">{product.name}</h3>
                                            </Link>
                                            <div className="flex items-center gap-1 text-yellow-500 text-sm shrink-0">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-gray-700 font-medium">{product.rating}</span>
                                            </div>
                                        </div>
                                        <p className="font-bold text-xl mb-6" style={{ color: hero.color }}>{product.price} ج.م</p>

                                        <div className="mt-auto pt-4 flex gap-3">
                                            <button
                                                onClick={() => addToCart(product, 1)}
                                                className="flex-1 text-white py-3 rounded-xl font-semibold transition-colors shadow flex justify-center items-center hover:opacity-90"
                                                style={{ backgroundColor: hero.color }}
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                            </button>
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="flex-[2] bg-gray-50 hover:bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold transition-colors border border-gray-200 text-center text-sm flex items-center justify-center"
                                            >
                                                التفاصيل
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center">
                                <p className="text-gray-400 text-2xl font-bold mb-4">لا توجد منتجات حالياً</p>
                                <Link to="/" className="text-[var(--color-brand)] underline font-semibold">تصفح الكل</Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
