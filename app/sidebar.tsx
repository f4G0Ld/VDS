'use client'

import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { DiLinux, DiWindows } from "react-icons/di";
import { LuShoppingCart, LuSquareArrowOutUpRight } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { SiFreebsd } from "react-icons/si";

type Server = {src: string, label: string}

interface SetupInter {
    cpuCores: number
    ram: number
    typeStorage: string
    storage: number
    system: string
    programs: string[]
    backup: string
    security: string
    chanel: string
    admin: string
    server: Server
    price: number
}

export function Sidebar({cpuCores, ram, typeStorage, storage, system, programs = [], backup, security, chanel, admin, server, price}: SetupInter) {
    const [open, setOpen] = useState(false)
    
    const items: {
        label: string
        value: string
    }[] = [
        {
            label: 'CPU',
            value: `${cpuCores} ядер`
        },
        {
            label: 'RAM',
            value: `${ram} Гб`
        },
        {
            label: typeStorage,
            value: `${storage} Гб`
        },
        {
            label: 'ОПЕРАЦИОННАЯ СИСТЕМА',
            value: system
        },
        {
            label: 'ПРЕДУСТАНОВЛЕННОЕ ПО',
            value: 
                programs && programs.length > 0 
                ? programs.map((p, i) => (i === 0 ? p : `${p}`)).join(', ')
                : 'Не выбрано' 
        },
        {
            label: 'РЕЗЕРВНОЕ КОПИРОВАНИЕ',
            value: backup
        },
        {
            label: 'ЗАЩИТА СЕРВЕРА',
            value: security
        },
        {
            label: 'АДМИНИСТРИРОВАНИЕ',
            value: admin
        },
    ]
    
    return (
        <div className="flex flex-col w-[352px]">
            <div className="p-6 flex flex-col gap-12 bg-linear-to-br from-[#4F6DD6] to-[#3EBFD4] rounded-tl-2xl rounded-tr-2xl">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <DiLinux size='32px'/>
                        <SiFreebsd size='32px'/>
                        <DiWindows size='32px'/>
                    </div>
                    <Dialog>
                        <form>
                        <DialogTrigger>
                            <LuSquareArrowOutUpRight size='24px'/>
                        </DialogTrigger>
                        <DialogContent className="bg-[#494B55] border-0 [&>button]:hidden">
                            <DialogHeader className="pb-2 border-b border-[#FFFFFF26]">
                                <DialogTitle className="flex justify-between items-center">
                                    <p className="text-[20px]">Конфигурация</p> 
                                    <DialogClose asChild>
                                        <button>
                                            <RxCross2 size='24px'/>
                                        </button>
                                    </DialogClose>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                                {items.map((item, index) => (
                                <div key={item.label + index} className="flex flex-col -space-y-1">
                                    <p className="text-[12px] text-[#C2C2C2] tracking-[0.96px]">{item.label}</p>
                                    <p>{item.value}</p>
                                </div>
                                ))}
                                {server && (
                                    <div className="flex flex-col -space-y-1">
                                        <p className="text-[12px] text-[#C2C2C2] tracking-[0.96px]">ЛОКАЦИЯ</p>
                                        <div className="flex gap-2 items-center">
                                            <Image 
                                                src={server.src}
                                                alt="!"
                                                width={24}
                                                height={24}
                                                className="size-4"
                                            />
                                            <p>{server.label}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                        </form>
                    </Dialog>
                    
                </div>
                <p className="text-[32px] font-medium text-nowrap">VDS Форсаж</p>
            </div>
            <div className="bg-[#494B55] rounded-bl-2xl rounded-br-2xl flex-1 p-6">
                <div className="flex flex-col justify-center items-center gap-2 pb-6 border-b border-[#FFFFFF26]">
                    <div className="flex items-center justify-center gap-1">
                        <p className="text-[40px] font-medium">
                            {price}
                        </p>
                        <div className="flex flex-col m-0">
                            <p className="font-bold text-[10px] border-b">
                                руб
                            </p>
                            <p className="font-bold text-[10px]">
                                мес
                            </p>
                        </div>
                    </div>
                    <button className="flex w-full gap-2 p-4 bg-[#83B235] items-center justify-center rounded-xl active:bg-[#557620] transition-all duration-200 ease-in-out">
                        <LuShoppingCart size='20px'/>
                        <p>Добавить в корзину</p>
                    </button>
                    <p className="text-[#FFFFFF60] border-b border-[#FFFFFF60] w-fit cursor-help">Как списываются деньги за услуги ?</p>
                </div>
                <div className="flex flex-col pt-6 gap-2 pb-6 border-b border-[#FFFFFF26]">
                    <p className="text-[20px] tracking-wider">Конфигурация</p>
                    <div className="relative">
                        <div className={`flex flex-col gap-4 overflow-hidden transition-[max-height] duration-200 ease-in-out 
                            ${open ? '' : 'max-h-60 '}`}
                            >
                            {items.map((item, index) => (
                                <div key={item.label + index} className="flex flex-col -space-y-1">
                                    <p className="text-[12px] text-[#C2C2C2] tracking-[0.96px]">{item.label}</p>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                        </div>
                        {!open && (
                            <div className="pointer-events-none absolute bg-linear-to-t from-[#494B55] to-transparent h-12 bottom-0 inset-x-0">
                            </div>
                        )}
                    </div>
                    <p className="text-[#83B235] underline underline-[#83B235]" onClick={() => setOpen(!open)}>{`${open ? 'Скрыть' : 'Полная конфигурация'}`}</p>
                </div>
            </div>
        </div>
    )
}