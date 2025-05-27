import { Link } from "react-router-dom";

const cards = [
    {
        title: "Installation",
        description:
            "Get started with Dojo by installing the toolchain and setting up your environment.",
        link: "/installation",
    },
    {
        title: "Tools Overview",
        description:
            "Discover the Dojo tools designed to streamline your application's build and deployment process.",
        link: "/toolchain/katana",
    },
    {
        title: "Architecture",
        description:
            "Explore the core architecture powering Dojo's onchain capabilities.",
        link: "/framework",
    },
    {
        title: "Scaling",
        description:
            "Dive into ephemeral, persistent, and sovereign rollup options to scale your onchain computation.",
        link: "/architecture/execution-sharding",
    },
    {
        title: "Tutorials",
        description:
            "Check out practical examples built with Dojo, featuring MMOs, NFTs, and more.",
        link: "/tutorials/dojo-starter",
    },
    {
        title: "Community",
        description:
            "Join our Discord to connect with fellow Dojo developers, ask questions, and share insights.",
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
                    className="group block transform transition-all duration-200 hover:scale-105 h-full"
                >
                    <div className="p-5 rounded-xl bg-[#181818] backdrop-filter backdrop-blur-lg shadow-lg group-hover:shadow-red-600/5 duration-150 group-hover:bg-[#202020] transition-colors relative overflow-hidden h-full flex flex-col">
                        <div className="flex gap-4 items-center">
                            <h2 className="text-lg sm:text-xl font-bold">
                                {card.title}
                            </h2>
                        </div>
                        <div className="flex-1 flex items-center">
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
