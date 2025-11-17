"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

type Item = {
    id: string;
    label: string;
};

export function Configuration({
    items,
    activeID,
}: {
    items: Item[];
    activeID: string;
}) {
    const [active, setActive] = useState(activeID);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", () => {
        const activationLine = window.scrollY + 120;
        const pageBottom = window.scrollY + window.innerHeight;
        const docHeight = document.body.scrollHeight;

        let closestId = active;
        let closestDistance = Infinity;

        items.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;

            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            
            if (activationLine >= top && activationLine < bottom) {
                closestId = id;
            }

            if (pageBottom >= docHeight - 5) {
                closestId = items[items.length - 1].id;
                return;
            }

            const distance = Math.abs(activationLine - top);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestId = id;
            }
        });

        setActive(closestId);
    });

    const scrollToElement = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 70;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (activeID) setActive(activeID);
    }, [activeID]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <SlidersHorizontal className="size-5 text-[#83B235]" />
                <p className="font-semibold text-xl ">Конфигурация</p>
            </div>
            <div className="relative rounded-xl">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-[#494B55]" />
                <nav>
                    {items.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <motion.div
                                key={item.id}
                                onClick={() => scrollToElement(item.id)}
                                className="relative py-2 pl-9 cursor-pointer"
                            >
                                <div className="absolute left-2 top-1 -translate-y-1/2 w-2.5 h-8 border-l border-b rounded-bl-2xl border-[#494B55]" />
                                <motion.div
                                    className="absolute left-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                    animate={{
                                        backgroundColor: isActive ? "#83B235" : "#494B55",
                                        scale: isActive ? 1.25 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                                <p
                                    className={`transition-colors duration-200 whitespace-nowrap ${
                                        isActive ? "font-medium text-white" : "text-[#FFFFFF80]"
                                    }`}
                                >
                                    {item.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}