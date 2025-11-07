import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCT_CATEGORIES } from '../constants';
import type { ProductCategory, ProductVariant } from '../types';

interface ProductSelectorProps {
    selectedCategory: ProductCategory | null;
    onSelectCategory: (category: ProductCategory) => void;
    selectedVariant: ProductVariant | null;
    onSelectVariant: (variant: ProductVariant | null) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
    selectedCategory,
    onSelectCategory,
    selectedVariant,
    onSelectVariant
}) => {
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

    // Reset filters and variant when category changes
    useEffect(() => {
        setActiveFilters({});
        onSelectVariant(null);
    }, [selectedCategory, onSelectVariant]);

    // Simplified click handler: just toggle the filter for the clicked attribute
    const handleOptionClick = (attrKey: string, optionValue: string) => {
        setActiveFilters(currentFilters => {
            const newFilters = { ...currentFilters };
            // If clicking the currently active filter, deactivate it. Otherwise, activate it.
            if (currentFilters[attrKey] === optionValue) {
                delete newFilters[attrKey];
            } else {
                newFilters[attrKey] = optionValue;
            }
            return newFilters;
        });
    };

    // Memoize the calculation of filtered variants based on active filters
    const filteredVariants = useMemo(() => {
        if (!selectedCategory) return [];
        return selectedCategory.variants.filter(variant => {
            return Object.entries(activeFilters).every(([key, value]) => {
                return variant.attributes[key] === value;
            });
        });
    }, [selectedCategory, activeFilters]);

    // Auto-select the variant if filters result in a single unambiguous choice
    useEffect(() => {
        if (filteredVariants.length === 1) {
            onSelectVariant(filteredVariants[0]);
        } else {
            onSelectVariant(null);
        }
    }, [filteredVariants, onSelectVariant]);

    return (
        <div className="flex flex-col gap-6">
            {/* Category Selector */}
            <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-300">Product Type</h3>
                <div className="flex flex-wrap gap-3">
                    {PRODUCT_CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onSelectCategory(category)}
                            className={`
                                px-4 py-2 border-2 rounded-lg font-semibold transition-all duration-200
                                ${selectedCategory?.id === category.id
                                    ? 'bg-brand-primary border-brand-primary text-white'
                                    : 'bg-base-200 border-base-300 text-base-content hover:border-brand-secondary'
                                }
                            `}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Attribute Filters */}
            {selectedCategory && selectedCategory.attributes.map(attr => {
                const allOptionsForAttr = [...new Set(selectedCategory.variants.map(v => v.attributes[attr.key]))].filter(Boolean) as string[];

                if (allOptionsForAttr.length === 0) return null;

                return (
                    <div key={attr.key}>
                        <h3 className="text-lg font-semibold mb-3 text-gray-300">{attr.name}</h3>
                        <div className="flex flex-wrap gap-3">
                            {allOptionsForAttr.map(option => {
                                // Determine if this option is compatible with the *other* active filters.
                                const otherFilters = { ...activeFilters };
                                delete otherFilters[attr.key];

                                const isEnabled = selectedCategory.variants.some(variant => {
                                    if (variant.attributes[attr.key] !== option) {
                                        return false; // Must match the current option
                                    }
                                    // And must also match all other active filters
                                    return Object.entries(otherFilters).every(([key, value]) => {
                                        return variant.attributes[key] === value;
                                    });
                                });

                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleOptionClick(attr.key, option)}
                                        disabled={!isEnabled}
                                        className={`
                                            px-4 py-2 border-2 rounded-lg font-semibold transition-all duration-200 capitalize
                                            ${activeFilters[attr.key] === option
                                                ? 'bg-brand-secondary border-brand-secondary text-white'
                                                : 'bg-base-200 border-base-300 text-base-content'
                                            }
                                            ${isEnabled
                                                ? 'hover:border-brand-primary'
                                                : 'opacity-40 cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}


            {/* Variant Selector */}
            {selectedCategory && (
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">Select Design</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredVariants.map((variant) => (
                            <div
                                key={variant.id}
                                onClick={() => onSelectVariant(variant)}
                                className="flex flex-col gap-2 items-center cursor-pointer group"
                            >
                                <div
                                    className={`
                                        relative w-full aspect-square border-2 rounded-lg transition-all duration-300 transform group-hover:scale-105
                                        ${selectedVariant?.id === variant.id ? 'border-brand-primary shadow-2xl' : 'border-base-300'}
                                    `}
                                >
                                    <img src={variant.imageUrl} alt={variant.name} className="w-full h-full object-cover rounded-md" />
                                    {selectedVariant?.id === variant.id && (
                                        <div className="absolute -top-2 -right-2 bg-brand-primary text-white rounded-full h-6 w-6 flex items-center justify-center">
                                            ✓
                                        </div>
                                    )}
                                </div>
                                <p className={`text-sm text-center transition-colors ${selectedVariant?.id === variant.id ? 'text-brand-primary font-semibold' : 'text-gray-400 group-hover:text-white'}`}>
                                    {variant.name}
                                </p>
                            </div>
                        ))}
                    </div>
                     {filteredVariants.length === 0 && Object.keys(activeFilters).length > 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p>No products match the selected filters.</p>
                            <p className="text-sm">Try changing your selection.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
