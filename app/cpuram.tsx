'use client'

import { useMemo, useState } from "react"
import { Slider } from "@/components/ui/slider";
import Info from "../components/info";

export default function CpuRam () {

    const [cpuCores, setCpuCores] = useState([16])
    const [ramSize, setRamSize] = useState([32])

    const cpuPrice = useMemo(() => {
        if (cpuCores[0] <= 16) {
            return 0
        }
        
        const pricePerStep = 100
        const steps = (cpuCores[0] - 8) / 4
        
        return pricePerStep * steps
    }, [cpuCores])
    
    const ramPrice = useMemo(() => {
        if (ramSize[0] <= 32) {
            return 0
        }
        
        const pricePerStep = 200
        const steps = (ramSize[0] - 8) / 8
        
        return pricePerStep * steps
    }, [ramSize])

    return (
        <div className="flex flex-col w-[692px] gap-2">
            <Info 
            title="Процессор и память"
            text='Как выбрать количество ядер и памяти ?'
            />
            <div className="flex flex-col p-6 border border-[#494B55] rounded-2xl gap-4">
                <div className="flex justify-between pb-2 border-b border-[#494B55]">
                    <p>Количество ядер процессора (до 3,7 ГГц)</p>
                    <p className="text-[#83B235]">{cpuPrice > 0 ? `+${cpuPrice} ₽` : '+0 ₽'}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Slider className="w-134"
                        value={cpuCores}
                        onValueChange={setCpuCores}
                        min={8}
                        max={128}
                        step={4}
                    />
                    <p className="bg-[#494B55] text-[#83B235] font-medium rounded-xl w-12 text-center py-1 px-0.5 ">
                        {cpuCores[0]}
                    </p>
                    <p className="w-8">Ядер</p>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#494B55]">
                    <p>Объём оперативной памяти (DDR4)</p>
                    <p className="text-[#83B235]">{ramPrice > 0 ? `+${ramPrice} ₽` : '+0 ₽'}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Slider className="w-134" 
                        value={ramSize}
                        onValueChange={setRamSize}
                        min={8}
                        max={256}
                        step={8}
                    />
                    <p className="bg-[#494B55] text-[#83B235] font-medium rounded-xl w-12 text-center py-1 px-0.5 ">
                        {ramSize[0]}
                    </p>
                    <p className="w-8">ГБ</p>
                </div>
            </div>
        </div>
    )
} 