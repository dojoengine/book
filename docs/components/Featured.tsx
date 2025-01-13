import Dojo from "../public/dojo-icon.svg?react";
import Origami from "../public/origami-icon.svg?react";
import Torii from "../public/torii-icon.svg?react";
import Katana from "../public/katana-icon.svg?react";
import Discord from "../public/discord.svg?react";

import { Link } from "react-router-dom";

const cards = [
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
            "Join the Dojo Discord and get help from other developers.",
        icon: <Discord className="w-8" />,
        link: "https://discord.gg/dojoengine",
    },
];

export function Featured() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {cards.map((card, index) => (
                <Link
                    to={card.link}
                    key={index}
                    className="group block transform transition-all duration-200 hover:scale-105"
                >
                    <div className="p-5 rounded-xl bg-[#181818] backdrop-filter backdrop-blur-lg shadow-lg group-hover:shadow-red-600/5 duration-150 group-hover:bg-[#202020] transition-colors relative overflow-hidden">
                        <div className="flex gap-4 items-center">
                            {card.icon}
                            <h2 className="text-lg sm:text-xl font-bold">
                                {card.title}
                            </h2>
                        </div>
                        <div>
                            <p className="mt-4 text-sm sm:text-base text-gray-400">
                                {card.description}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
