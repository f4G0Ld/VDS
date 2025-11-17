'use client'

import Image from "next/image";
import Location from "./location";
import { Dialog } from "@radix-ui/react-dialog";
import CpuRam from "./cpuram";
import Storage from "./storage";
import System from "./system";
import Backup from "./backup";
import Administrating from "./administrating";
import Security from "./security";
import { useState, useEffect } from "react";
import { Configuration } from "./configuration";
import Network from "./network";
import { Sidebar } from "./sidebar";

export interface ServerConfig {
  cpuCores: number;
  ram: number;
  storage: number;
  typeStorage: string;
  system: string;
  programs: string[];
  backup: string;
  security: string;
  network: string;
  admin: string;
  server: { src: string; label: string };
  price: number;
}

const calculatePrice = (config: Omit<ServerConfig, 'price'>): number => {
  let basePrice = 2000;
  
  
  basePrice += config.cpuCores * 100;
  basePrice += config.ram * 50;
  basePrice += config.storage * 25;
  
  
  if (config.server.label !== "Россия") {
    basePrice += 150;
  }
  
  return basePrice;
};

const items = [
  { id: "location", label: "Локация" },
  { id: "cpuram", label: "Процессор и память" },
  { id: "storage", label: "Хранилище" },
  { id: "system", label: "Система" },
  { id: "backup", label: "Резервное копирование" },
  { id: "security", label: "Защита сервера и сайта" },
  { id: "administation", label: "Администрирование" },
];


export default function Home() {
  const [config, setConfig] = useState<ServerConfig>({
    cpuCores: 16,
    ram: 32,
    storage: 512,
    typeStorage: "SSD",
    system: "Ubuntu 24.04",
    programs: [],
    backup: "Выкл",
    security: "Выкл",
    network: "до 100 Мбит/с - безлимит",
    admin: "Нет",
    server: { src: "ruflag.svg", label: "Россия" },
    price: 3849
  });

  useEffect(() => {
    const { price, ...configWithoutPrice } = config;
    const newPrice = calculatePrice(configWithoutPrice);
    setConfig(prev => ({ ...prev, price: newPrice }));
  }, [config.cpuCores, config.ram, config.storage, config.server]);

  const updateConfig = (updates: Partial<ServerConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const activeID: string = "location";

  return ( 
    <div className="flex py-6 justify-center gap-6 w-full container">

      <div className="flex-none sticky top-8 self-start hidden lg:block w-56">
        <Configuration items={items} activeID={activeID} />
      </div>
      <div className="flex flex-col gap-6">
        <section id='location' className="flex justify-center">
          <Location onServerChange={(server) => updateConfig({ server })} />
        </section>

        <section id='cpuram' className="flex justify-center">
          <CpuRam 
            cpuCores={config.cpuCores}
            ram={config.ram}
            onCpuCoresChange={(cpuCores) => updateConfig({ cpuCores })}
            onRamChange={(ram) => updateConfig({ ram })}
          />
        </section>

        <section id='storage' className="flex justify-center">
          <Storage 
            storage={config.storage}
            typeStorage={config.typeStorage}
            onStorageChange={(storage) => updateConfig({ storage })}
            onTypeStorageChange={(typeStorage) => updateConfig({ typeStorage })}
          />
        </section>

        <section id='system' className="flex justify-center">
          <System 
            system={config.system}
            programs={config.programs}
            onSystemChange={(system) => updateConfig({ system })}
            onProgramsChange={(programs) => updateConfig({ programs })}
          />
        </section>

        <section id='backup' className="flex justify-center">
          <Backup 
            backup={config.backup}
            onBackupChange={(backup) => updateConfig({ backup })} 
          />
        </section>

        <section id='security' className="flex justify-center">
          <Security 
            security={config.security}
            onSecurityChange={(security) => updateConfig({ security })} 
          />
        </section>

        <section id='administration' className="flex justify-center">
          <Administrating
            admin={config.admin}
            onPacketChange={(admin) => updateConfig({ admin })} 
          />
        </section>
      </div> 
      <div>
        <Sidebar config={config}/>
      </div>
    </div>
  );
}
