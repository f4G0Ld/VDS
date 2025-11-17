interface InfoProps {
    title: string;
    text?: string;
    infoTxt?: string;
}

export default function Info({ title, text, infoTxt = 'Информация о блоке' }: InfoProps) {
    return (
        <div className="flex flex-col xl:flex-row justify-between text-start xl:text-center xl:items-center">
            <span className="font-semibold text-2xl">
                {title}
            </span>
            <div className="relative group inline-block h-fit">
                <span className="opacity-60 border-b cursor-help inline-block">
                    {text}
                </span>
                
                <div className="hidden xl:block absolute right-0 z-10 text-start mt-3 p-4 rounded-2xl bg-white text-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-full before:content-[' '] before:absolute before:right-12 before:top-0 before:-mt-5 before:border-12 before:border-transparent before:border-b-white before:z-20">
                    <div className="text-black">
                        {infoTxt}
                    </div>
                </div>
            </div>
        </div>
    );
}