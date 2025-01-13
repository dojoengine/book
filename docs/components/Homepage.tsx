import { useEffect, useState, useCallback } from "react";
import Dojo from "../public/dojo-icon.svg?react";
import Cartridge from "../public/Cartridge.svg?react";
import Starkware from "../public/Starkware.svg?react";
import Starknet from "../public/Starknet.svg?react";
import Celestia from "../public/Celestia.svg?react";
import Javascript from "../public/javascript-js.svg?react";
import Rust from "../public/rust.svg?react";
import Unity from "../public/unity-3d.svg?react";
import Godot from "../public/godot.svg?react";
import Bevy from "../public/bevy-icon.svg?react";
import Discord from "../public/discord.svg?react";
import Telegram from "../public/telegram.svg?react";
import C from "../public/c.svg?react";

import Torii from "../public/torii-icon.svg?react";
import Katana from "../public/katana-icon.svg?react";
import Origami from "../public/origami-icon.svg?react";

import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Ecosystem } from "./Ecosystem";

import { controllerConfigs, type ControllerTheme } from "@cartridge/presets";

interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

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

const sponsorContent = [
    { icon: <Cartridge className="w-48" />, link: "https://cartridge.gg/" },
    { icon: <Starkware className="w-48" />, link: "https://starkware.co/" },
    { icon: <Starknet className="w-48" />, link: "https://starknet.io/" },
    { icon: <Celestia className="w-32" />, link: "https://celestia.org/" },
];

const PresetCard = ({ theme }: { theme: ControllerTheme }) => {
    return (
        <div className="p-4 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer">
            <div className="aspect-video w-full relative mb-4 rounded-lg overflow-hidden">
                {/* Cover image */}
                <img
                    src={
                        typeof theme.cover === "string"
                            ? theme.cover
                            : theme.cover.dark
                    }
                    alt={`${theme.name} cover`}
                    className="w-full h-full object-cover"
                />
                {/* Icon overlay */}
                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm p-1">
                    <img
                        src={theme.icon}
                        alt={`${theme.name} icon`}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
            <h3 className="text-lg font-medium">{theme.name}</h3>
        </div>
    );
};

export function HomePage() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [contributorsLoading, setContributorsLoading] = useState(false);
    const [totalContributors, setTotalContributors] = useState(0);

    const fetchContributors = useCallback(async () => {
        if (contributorsLoading) return;
        setContributorsLoading(true);
        try {
            // First make a HEAD request to get total count from Link header
            const countResponse = await fetch(
                "https://api.github.com/repos/dojoengine/dojo/contributors?per_page=1",
                { method: "HEAD" }
            );

            const linkHeader = countResponse.headers.get("Link");
            if (linkHeader) {
                const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
                if (matches) {
                    setTotalContributors(parseInt(matches[1]));
                }
            }

            // Then fetch the first 5 contributors for display
            const response = await fetch(
                `https://api.github.com/repos/dojoengine/dojo/contributors?per_page=5`
            );
            if (response.ok) {
                const data: Contributor[] = await response.json();
                setContributors(data);
            } else {
                console.error("Failed to fetch contributors");
            }
        } catch (error) {
            console.error("Error fetching contributors:", error);
        } finally {
            setContributorsLoading(false);
        }
    }, [contributorsLoading]);

    useEffect(() => {
        fetchContributors();
    }, []);

    const presets = Object.entries(controllerConfigs).map(([key, config]) => ({
        ...config.theme,
        key,
    }));

    return (
        <div
            style={{
                paddingLeft:
                    "calc(var(--vocs_DocsLayout_leftGutterWidth) - var(--vocs-sidebar_width) + var(--vocs-sidebar_horizontalPadding))",
                paddingRight:
                    "calc(var(--vocs_DocsLayout_leftGutterWidth) - var(--vocs-sidebar_width) + var(--vocs-sidebar_horizontalPadding))",
            }}
        >
            <Header />
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
                                <h2 className="text-lg sm:text-xl">
                                    {card.title}
                                </h2>
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

            <Ecosystem />

            <div className="container mx-auto p-4 sm:p-6 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-3 self-center">
                        <h3 className="text-xl sm:text-2xl">Clients</h3>
                        <p className="mt-2 text-sm sm:text-base">
                            Build onchain apps in your favorite language, on
                            your favourite platform.
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

            <div className="container mx-auto p-4 sm:p-6 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-3 self-center">
                        <h3 className="text-xl sm:text-2xl">Partners</h3>
                        <p className="mt-2 text-sm sm:text-base">
                            Supported by the best in the industry.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 lg:col-span-9">
                        {sponsorContent.map((card, index) => (
                            <a
                                href={card.link}
                                key={index}
                                className="p-4 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden flex items-center justify-center"
                            >
                                <div className="flex items-center justify-center">
                                    {card.icon}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contributors Section */}
            <div className="container mx-auto p-4 sm:p-6 lg:p-12">
                <h2 className="text-2xl sm:text-3xl mb-4 text-center">
                    Epic Contributors
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {contributors.map((contributor) => (
                        <a
                            key={contributor.id}
                            href={contributor.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-col p-2 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-2 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden flex items-center justify-center"
                        >
                            <img
                                src={contributor.avatar_url}
                                alt={contributor.login}
                                className="w-16 h-16 rounded-full border border-[#252525]"
                            />
                            <span className="text-sm">{contributor.login}</span>
                        </a>
                    ))}
                    <a
                        href="https://github.com/dojoengine/dojo/graphs/contributors"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-col p-2 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-2 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden flex items-center justify-center"
                    >
                        <div className="w-16 h-16 rounded-full border border-[#252525] flex items-center justify-center text-2xl font-bold">
                            +{totalContributors - 5}
                        </div>
                        <span className="text-sm">More</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
