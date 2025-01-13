import Cartridge from "../public/Cartridge.svg?react";
import Starkware from "../public/Starkware.svg?react";
import Starknet from "../public/Starknet.svg?react";
import Celestia from "../public/Celestia.svg?react";

const partners = [
    { icon: <Cartridge className="w-48" />, link: "https://cartridge.gg/" },
    { icon: <Starkware className="w-48" />, link: "https://starkware.co/" },
    { icon: <Starknet className="w-48" />, link: "https://starknet.io/" },
    { icon: <Celestia className="w-32" />, link: "https://celestia.org/" },
];

export function Partners() {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-12">
            <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl mb-2">Partners</h3>
                <p className="text-sm sm:text-base text-white/70">
                    Supported by the best in the industry.
                </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
                {partners.map((partner, index) => (
                    <a
                        href={partner.link}
                        key={index}
                        className="hover:opacity-80 transition-opacity"
                    >
                        {partner.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}
