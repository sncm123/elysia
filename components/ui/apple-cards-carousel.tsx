"use client";
import React, {
    useEffect,
    useRef,
    useState,
    createContext,
    useContext,
} from "react";
import {
    IconArrowNarrowLeft,
    IconArrowNarrowRight,
    IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
    items: JSX.Element[];
    autoPlayInterval?: number;
}

export const Carousel = ({ items, autoPlayInterval = 5000 }: CarouselProps) => {
    const [visibleCard, setVisibleCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const next = () => {
        setVisibleCard((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const previous = () => {
        setVisibleCard((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            next();
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isPaused, autoPlayInterval, items.length]);

    return (
        <div className="max-w-7xl mx-auto">
            <div
                ref={containerRef}
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="flex items-center px-4 py-8">
                    <button
                        onClick={() => {
                            previous();
                            setIsPaused(true);
                        }}
                        className={cn(
                            "p-3 rounded-full bg-gray-100 dark:bg-gray-900 opacity-80 hover:opacity-100 transition-opacity",
                            visibleCard === 0 ? "opacity-50 cursor-not-allowed" : ""
                        )}
                        disabled={visibleCard === 0}
                    >
                        <IconArrowNarrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex overflow-hidden mx-4">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{
                                transform: `translateX(-${visibleCard * 100}%)`,
                            }}
                        >
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-full"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            next();
                            setIsPaused(true);
                        }}
                        className={cn(
                            "p-3 rounded-full bg-gray-100 dark:bg-gray-900 opacity-80 hover:opacity-100 transition-opacity",
                            visibleCard === items.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                        )}
                        disabled={visibleCard === items.length - 1}
                    >
                        <IconArrowNarrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                index === visibleCard
                                    ? "bg-gray-800 dark:bg-white w-4"
                                    : "bg-gray-300 dark:bg-gray-600"
                            )}
                            onClick={() => {
                                setVisibleCard(index);
                                setIsPaused(true);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface CardProps {
    card: {
        category: string;
        title: string;
        src: string;
        content: React.ReactNode;
    };
    index: number;
}

export const Card = ({ card, index }: CardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useOutsideClick(cardRef, () => {
        setIsOpen(false);
    });

    return (
        <div ref={cardRef} className="px-5">
            <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer group relative overflow-hidden rounded-2xl"
            >
                <Image
                    src={card.src}
                    alt={card.title}
                    width={1000}
                    height={500}
                    className="object-cover w-full aspect-[16/10] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60">
                    <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-white/70 mb-2 text-sm">{card.category}</p>
                        <h3 className="text-white text-2xl font-semibold">{card.title}</h3>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed inset-4 md:inset-10 z-50 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="relative h-full overflow-auto">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 z-10"
                            >
                                <IconX className="w-4 h-4" />
                            </button>
                            <div className="p-6 md:p-10">
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                                    {card.category}
                                </p>
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">{card.title}</h2>
                                {card.content}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
