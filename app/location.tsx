'use client'

import { useState, useMemo } from "react"
import Image from "next/image";
import DualToggle from "../components/toggle";
import Info from "@/components/info";

export default function Location () {
    const [activeId, setActiveId] = useState<0 | 1>(0);

    const locationPrice = useMemo(() => {
        return activeId === 1 ? 200 : 0;
    }, [activeId]);

    return (
        <div className="flex flex-col flex-1 gap-2">
            <Info
            title="Локация" 
            text="На что влияет локация ?"
            />
            <div className="flex flex-col p-6 border border-[#494B55] rounded-2xl gap-4">
                <div className="flex justify-between pb-2 border-b border-[#494B55]">
                    <p>Регион сервера</p>
                    <p className="text-[#83B235]">{locationPrice > 0 ? `+${locationPrice} ₽` : '+0 ₽'}</p>
                </div>
                <div className="flex font-medium">
                    <DualToggle 
                        left={
                            <div className="flex items-center gap-2 py-2.25 px-8">
                                <Image 
                                src='ruflag.svg'
                                alt='RuFlag'
                                width={20}
                                height={20}
                                />
                                <p>Москва</p>
                            </div>
                        }
                        right={
                            <div className="flex items-center gap-2 py-2.25 px-4.5">
                                <Image 
                                src='nlflag.svg'
                                alt='NlFlag'
                                width={20}
                                height={20}
                                />
                                <p>Амстердам</p>
                            </div>
                        }
                        initialActiveId={0}
                        onToggle={setActiveId}
                    />
                </div>
            </div>
        </div>
    )
}