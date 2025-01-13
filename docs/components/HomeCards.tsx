import Dojo from "../public/dojo-icon.svg?react";
import Origami from "../public/origami-icon.svg?react";
import Torii from "../public/torii-icon.svg?react";
import Katana from "../public/katana-icon.svg?react";
import { Link } from "react-router-dom";

const cardContent = [
    {
        title: "What is Dojo?",
        description:
            "Understand what Dojo is and how it can help you build games on the blockchain.",
        icon: <Dojo className="w-8" />,
        link: "/what-is-dojo",
    },
    {
        title: "Getting Started",
        description:
            "Learn how to get started with Dojo and build your first application.",
        icon: <Origami className="w-8" />,
        link: "/getting-started",
    },
    {
        title: "Framework",
        description:
            "Deeply understand the Dojo framework and how it can be used to build applications.",
        icon: <Torii className="w-8" />,
        link: "/framework",
    },
    {
        title: "Tool Chain",
        description:
            "Learn about the tools that Dojo provides to help you build and deploy applications.",
        icon: <Katana className="w-8" />,
        link: "/toolchain/katana",
    },
    {
        title: "Examples",
        description:
            "Explore examples of applications built with Dojo. MMOs, NFTs, and more.",
        icon: <Dojo className="w-8" />,
        link: "/tutorial/dojo-starter",
    },
    {
        title: "Community",
        description:
            "Join the Dojo community and get help from other developers.",
        icon: <Dojo className="w-8" />,
        link: "https://discord.gg/dojoengine",
    },
];

export function HomeCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {cardContent.map((card, index) => (
                <Link
                    to={card.link}
                    key={index}
                    className="p-6 sm:p-8 border border-[#252525] rounded-xl bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
                    <div className="relative z-10">
                        <div className="flex gap-4 items-center">
                            {card.icon}{" "}
                            <h2 className="text-lg sm:text-xl">{card.title}</h2>
                        </div>
                        <div>
                            <p className="mt-4 text-sm sm:text-base text-white/70">
                                {card.description}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
} 