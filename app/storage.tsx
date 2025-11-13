'use client'

import { useState, useMemo } from "react"
import Info from "@/components/info";
import DualToggle from "@/components/toggle";
import { Slider } from "@/components/ui/slider";

export default function Storage () {
    const [storageCapacity, setStorageCapacity] = useState([512]);
    const [storageType, setStorageType] = useState<'SSD' | 'NVMe'>('SSD');

    
    const handleToggleChange = (activeId: 0 | 1) => {
        
        setStorageType(activeId === 0 ? 'SSD' : 'NVMe');
    };

    
    const storagePrice = useMemo(() => {
        
        if (storageCapacity[0] === 512) {
            
            if (storageType === 'SSD') {
                return 0;
            }
            
            else {
                return 4096;
            }
        }
        
        
        const pricePerGB = {
            'SSD': 2,
            'NVMe': 8
        };
        
        return (storageCapacity[0] - 512) * pricePerGB[storageType] + (storageType === 'NVMe' ? 4096 : 0);
    }, [storageCapacity, storageType]);

    
    
    return (
        <div className="flex flex-col w-[692px] gap-2">
            <Info 
            title="Хранилище"
            text="Как выбрать накопитель и его объём?"
            />
            <div className="flex flex-col p-6 border border-[#494B55] rounded-2xl gap-4">
                <DualToggle 
                left={<p className="flex items-center gap-2 py-2.25 px-5">SSD</p>}
                right={<p className="flex items-center gap-2 py-2.25 pl-5 pr-3">NVMe</p>}
                onToggle={handleToggleChange}
                />
                <div className="flex justify-between pb-2 border-b border-[#494B55]">
                    <p>Объём накопителя</p>
                    <p className="text-[#83B235]">{storagePrice > 0 ? `+${storagePrice} ₽` : '+0 ₽'}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Slider className="w-134" 
                        value={storageCapacity}
                        onValueChange={setStorageCapacity}
                        min={128}
                        max={2048}
                        step={128}
                    />
                    <p className="bg-[#494B55] text-[#83B235] font-medium rounded-xl w-12 text-center py-1 px-0.5 ">
                        {storageCapacity[0]}
                    </p>
                    <p className="w-8">ГБ</p>
                </div>
            </div>
        </div>
    )
}