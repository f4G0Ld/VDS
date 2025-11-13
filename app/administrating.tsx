'use client'

import { useState, useMemo } from "react"

import Info from "@/components/info";
import DualToggle from "@/components/toggle";

export default function Administration () {
    return (
        <div className="flex flex-col w-[692px] gap-2">
            <Info 
            title="Администрирование"
            text="Зачем нужно администрирование ?"
            />
            <div className="flex flex-col p-6 border border-[#494B55] rounded-2xl gap-4">
                <div className="flex justify-between pb-2 border-b border-[#494B55]">
                    <p>Пакет включает 5 обращений в месяц</p>
                    <p className="text-[#83B235]">+0 ₽</p>
                </div>
                <div className="flex font-medium">
                    <DualToggle 
                        left={
                            <div className="flex items-center gap-2 py-2.25 pl-5 pr-3.5">
                                <p>Выкл</p>
                            </div>
                        }
                        right={
                            <div className="flex items-center gap-2 py-2.25 px-5">
                                <p>Вкл</p>
                            </div>
                        }
                        />
                </div>
            </div>
        </div>
    )
}