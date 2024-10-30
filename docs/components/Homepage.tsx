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

import RealmsWorld from "../public/RealmsWorld.svg?react";
import DopeWars from "../public/Dope.svg?react";

import Torii from "../public/torii-icon.svg?react";
import Katana from "../public/katana-icon.svg?react";
import Origami from "../public/origami-icon.svg?react";

import { Link } from "react-router-dom";

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

const usedBy = [
    { icon: <RealmsWorld className="w-24" />, link: "https://realms.world/" },
    { icon: <DopeWars className="w-24" />, link: "https://dopewars.game/" },
];

export function HomePage() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [contributorsPage, setContributorsPage] = useState(1);
    const [contributorsLoading, setContributorsLoading] = useState(false);
    const [hasMoreContributors, setHasMoreContributors] = useState(true);

    const CONTRIBUTORS_PER_PAGE = 30;

    const fetchContributors = useCallback(async () => {
        if (contributorsLoading || !hasMoreContributors) return;
        setContributorsLoading(true);
        try {
            const response = await fetch(
                `https://api.github.com/repos/dojoengine/dojo/contributors?per_page=${CONTRIBUTORS_PER_PAGE}&page=${contributorsPage}`
            );
            if (response.ok) {
                const data: Contributor[] = await response.json();
                setContributors((prev) => [...prev, ...data]);
                if (data.length < CONTRIBUTORS_PER_PAGE) {
                    setHasMoreContributors(false);
                } else {
                    setContributorsPage((prev) => prev + 1);
                }
            } else {
                console.error("Failed to fetch contributors");
                setHasMoreContributors(false);
            }
        } catch (error) {
            console.error("Error fetching contributors:", error);
            setHasMoreContributors(false);
        } finally {
            setContributorsLoading(false);
        }
    }, [contributorsLoading, contributorsPage, hasMoreContributors]);

    useEffect(() => {
        fetchContributors();
    }, [fetchContributors]);

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement;
        // When the user is within 100px of the bottom, load more
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            fetchContributors();
        }
    }, [fetchContributors]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="">
            <div className="border-y border-white/20 py-20 border-[#252525] ">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row gap-8 sm:gap-20">
                    <div className="self-center p-6 sm:p-8 border border-[#252525] rounded-xl ">
                        <Dojo className="w-16 sm:w-24" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl">
                            Dojo simplifies{" "}
                            <span className="text-primary">provable</span> and{" "}
                            <br /> onchain application development
                        </h1>

                        <div className="mt-6 relative">
                            <pre className="p-4 border border-[#252525] rounded-xl bg-gradient-to-br from-[#181818] to-[#0c0c0c] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden overflow-x-auto">
                                <code className="text-sm sm:text-base ">
                                    curl -L https://install.dojoengine.org |
                                    bash
                                </code>
                            </pre>
                            <button
                                className="absolute top-2 right-2  hover:bg-white/20 text-xs uppercase p-2 rounded"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        "curl -L https://install.dojoengine.org | bash"
                                    )
                                }
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-white/20 bg-gradient-to-br from-[#181818] to-[#0c0c0c]">
                <div className="container mx-auto p-4 sm:p-6 lg:p-12 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {cardContent.map((card, index) => (
                            <Link
                                to={card.link}
                                key={index}
                                className="p-6 sm:p-8 border border-[#252525] rounded-xl bg-gradient-to-br from-[#181818] to-[#0c0c0c] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden"
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
                </div>
            </div>

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
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    {contributors.map((contributor) => (
                        <a
                            key={contributor.id}
                            href={contributor.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" flex-col  p-2 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-2 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden flex items-center justify-center"
                        >
                            <img
                                src={contributor.avatar_url}
                                alt={contributor.login}
                                className="w-16 h-16 rounded-full border border-[#252525]"
                            />
                            <span className="text-sm">{contributor.login}</span>
                        </a>
                    ))}
                </div>
                {contributorsLoading && (
                    <p className="text-center mt-4">
                        Loading more contributors...
                    </p>
                )}
            </div>

            {/* "Used By" Section */}
            <div className="container mx-auto p-4 sm:p-6 lg:p-12">
                <h2 className="text-2xl sm:text-3xl mb-4">Used By</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {usedBy.map((repo, index) => (
                        <a
                            key={index}
                            href={repo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 flex border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer"
                        >
                            <div className="flex items-center justify-center mx-auto">
                                {repo.icon}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
