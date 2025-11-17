'use client'

import Info from "@/components/info";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, useState, useEffect } from "react";
import { DiUbuntu, DiLinux, DiDebian, DiWindows  } from "react-icons/di";
import { SiAlmalinux, SiFreebsd, SiRockylinux } from "react-icons/si";
import { RiCentosFill } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";

const systems = [
    {id: 'ubuntu', label: 'Ubuntu', version: '24.04', icon: <DiUbuntu size='24px'/> , price: 0},
    {id: 'alma', label: 'Alma', version: '9', icon: <SiAlmalinux size='24px' /> , price: 100},
    {id: 'debian', label: 'Debian', version: '11', icon: <DiDebian size='24px' /> , price: 50},
    {id: 'oracle', label: 'Oracle', version: '9', icon: <DiLinux size='24px' /> , price: 150},
    {id: 'centos', label: 'CentOS', version: '9 STREAM', icon: <RiCentosFill size='24px' /> , price: 200},
    {id: 'windows', label: 'Windows', version: '2019', icon: <DiWindows size='24px' /> , price: 200},
    {id: 'freebsd', label: 'FreeBSD', version: '13', icon: <SiFreebsd size='24px' /> , price: 300},
    {id: 'rocky', label: 'Rocky', version: '8', icon: <SiRockylinux size='24px' /> , price: 30}
]

const softwares = [
    {id: 'none', label: 'Не выбрано', price: 0},
    {id: 'ispl', label: 'ispmanager 6 lite', price: 50},
    {id: 'ispp', label: 'ispmanager 6 pro', price: 100},
    {id: 'isph', label: 'ispmanager 6 host', price: 150},
    {id: 'ts', label: 'Teamspeak', price: 200}, 
    {id: 'django', label: 'Django', price: 100},
    {id: 'nextcloud', label: 'Nextcloud', price: 100},
    {id: 'openvpn', label: 'Openvpn', price: 100},
    {id: 'wireguard', label: 'Wireguard VPN', price: 100},
    {id: 'lemp', label: 'LEMP', price: 100},
    {id: 'redmine', label: 'Redmine', price: 100},
    {id: 'forgejo', label: 'Forgejo Git', price: 100},
    {id: 'tomcat', label: 'Tomcat', price: 100},
    {id: 'gitlab', label: 'GitLab CE', price: 100},
]

interface systemButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string,
    version?: string,
    active?: boolean,
    icon?: React.ReactNode,
    className?: string
}

const SystemButton = ({name, icon, version, active = false, className, ...props}: systemButtonInterface) => {
    return (
        <button
        className={cn('bg-[#494B55] flex flex-1 p-2 rounded-xl transition-all duration-300 ease-in-out', `${active ? 'bg-[#83B235]' : 'bg-[#494B55]'}`)}
        {...props}
        >
            <div className="flex flex-1 flex-col gap-2">
                <div className={cn('flex flex-1 gap-2 pb-2 border-b items-center transition-all duration-300 ease-in-out', `${active ? 'border-white' : 'border-[#FFFFFF15]'}`)}>
                    {icon}
                    <p className="text-[14px] font-medium">{name}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[12px] font-medium">{version}</p>
                    <IoChevronDown size='12px'/>
                </div>
            </div>
        </button>
    )
}

interface softwareButtonProps {
    software: {
        id: string,
        label: string,
        price: number
    }
    selected: boolean
    onToggle: (id: string) => void
}

const SoftwareButton = ({software, selected, onToggle}: softwareButtonProps) => {
    return(
        <div
        className={cn('px-3 py-2 rounded-xl transition duration-300 ease-in-out w-fit', selected ? 'bg-[#83B235]' : 'bg-[#494B55]')}
        onClick={() => onToggle(software.id)}
        >
            <p className="font-medium">{software.label}</p>
        </div>
    )
}

interface systemInterface {
    onSystemChange?: (value: string) => void
    onProgramsChange?: (value: string[]) => void
}

export default function System ({ onSystemChange, onProgramsChange }: systemInterface) {
    const [selectedSoftware, setSelectedSoftware] = useState<string[]>(['none'])
    const [activeBut, setActiveButton] = useState('ubuntu')
    const [price, setPrice] = useState(0)

    const toggleSoftware = (softwareId: string) => {
        setSelectedSoftware(prev => {
            if (softwareId === 'none') {
                return ['none']
            }
            const newSelection = prev.includes(softwareId) 
                ? prev.filter(id => id !== softwareId)
                : [...prev.filter(id => id !== 'none'), softwareId]
                
            return newSelection.length === 0 ? ['none'] : newSelection
        })
    }

    const calculateTotalPrice = () => {
        return selectedSoftware.reduce((total, softwareId) => {
            const software = softwares.find(s => s.id === softwareId)
            return total + (software?.price || 0)
        }, 0)  
    }

    useEffect(() =>{
        if (onProgramsChange) {
            const selectedLabels = selectedSoftware.map((id) => softwares.find((s) => s.id === id)?.label || id)
            onProgramsChange(selectedLabels);
        }
    }, [selectedSoftware])


    return (
        <div className="flex flex-col gap-2 container">
            <Info 
                title="Система"
                text="Как выбрать операционную систему ?"
            />
            <div className="flex flex-col gap-6 rounded-2xl border border-[#494B55] p-6">
                <div className="flex justify-between items-center pb-2 border-b border-[#FFFFFF26]">
                    <p>Выбор операционной системы</p>
                    <p className="text-[#83B235]">{`+${price} ₽`}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {systems.map((sys) => (
                        <SystemButton
                            key={sys.id}
                            name={sys.label}
                            version={sys.version}
                            icon={sys.icon}
                            active={sys.id === activeBut}
                            onClick={() => {
                                setActiveButton(sys.id)
                                setPrice(sys.price)
                                onSystemChange?.(`${sys.label} ${sys.version}`)
                            }}
                        />
                    ))}
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#FFFFFF26]">
                    <p>Выбор предустановленного ПО</p>
                    <p className="text-[#83B235]">{calculateTotalPrice() === 0 ? '+0 ₽' : `+${calculateTotalPrice()} ₽`}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {softwares.map((software) => (
                        <SoftwareButton
                            key={software.id}
                            software={software}
                            selected={selectedSoftware.includes(software.id)}
                            onToggle={toggleSoftware}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}