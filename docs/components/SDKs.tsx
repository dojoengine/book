import Javascript from "../public/javascript-js.svg?react";
import Rust from "../public/rust.svg?react";
import Unity from "../public/unity-3d.svg?react";
import Godot from "../public/godot.svg?react";
import Bevy from "../public/bevy-icon.svg?react";
import C from "../public/c.svg?react";
import Discord from "../public/discord.svg?react";
import Telegram from "../public/telegram.svg?react";
import { Link } from "react-router-dom";

const sdkContent = [
    {
        icon: <Javascript className="w-6" />,
        title: "Javascript",
        link: "/client/sdk/javascript",
    },
    {
        icon: <Rust className="w-6" />,
        title: "Rust",
        link: "/client/sdk/rust",
    },
    {
        icon: <Unity className="w-6" />,
        title: "Unity",
        link: "/client/sdk/unity",
    },
    {
        icon: <Godot className="w-6" />,
        title: "Godot",
        link: "/client/sdk/godot",
    },
    {
        icon: <Bevy className="w-6" />,
        title: "Bevy",
        link: "/client/sdk/bevy",
    },
    {
        icon: <C className="w-6" />,
        title: "C",
        link: "/client/sdk/c",
    },
    {
        icon: <Discord className="w-6" />,
        title: "Discord",
        link: "/client/sdk/discord",
    },
    {
        icon: <Telegram className="w-6" />,
        title: "Telegram",
        link: "/client/sdk/telegram",
    },
];

export function SDKs() {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3 self-center">
                    <h3 className="text-xl sm:text-2xl">Clients</h3>
                    <p className="mt-2 text-sm sm:text-base">
                        Build onchain apps in your favorite language, on your
                        favourite platform.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 lg:col-span-9">
                    {sdkContent.map((card, index) => (
                        <Link
                            to={card.link}
                            key={index}
                            className="p-6 sm:p-8 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden"
                        >
                            <div className="flex gap-4 items-center">
                                {card.icon}{" "}
                                <h2 className="text-lg sm:text-xl">
                                    {card.title}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
