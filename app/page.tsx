import Image from "next/image";
import Location from "./location";
import { Dialog } from "@radix-ui/react-dialog";
import CpuRam from "./cpuram";
import Storage from "./storage";
import System from "./system";
import Backup from "./backup";
import Administration from "./administrating";
import Security from "./security";


export default function Home() {
  return ( 
    <div className="flex flex-col py-16 gap-6">
      <section className="flex justify-center">
        <Location />
      </section>

      <section className="flex justify-center">
        <CpuRam />
      </section>

      <section className="flex justify-center">
        <Storage />
      </section>

      <section className="flex justify-center">
        <System />
      </section>

      <section className="flex justify-center">
        <Backup />
      </section>

      <section className="flex justify-center">
        <Security />
      </section>

      <section className="flex justify-center">
        <Administration />
      </section>
    </div>
  );
}
