import { ControllerConfig, controllerConfigs } from "@cartridge/presets";
import { Card } from "./Card";

const FEATURED_GAMES = [
    "Dark Shuffle",
    "Blob Arena",
    "Eternum",
    "Dope Wars",
    "FlippyFlop",
    "Jokers of Neon",
    "Loot Survivor",
    "Savage Summit",
];

const GameCard = ({ config }: { config: ControllerConfig }) => {
    return (
        <Card className="rounded-xl overflow-hidden">
            <a
                href={
                    Array.isArray(config.origin)
                        ? config.origin[0]
                        : config.origin
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full relative bg-[#181818]"
            >
                <div className="absolute inset-0">
                    <img
                        src={
                            typeof config.theme?.cover === "string"
                                ? config.theme?.cover
                                : config.theme?.cover.dark
                        }
                        alt={`${config.theme?.name} background`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />
                <div className="relative z-10 h-full flex items-center p-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={config.theme?.icon}
                            alt={config.theme?.name}
                            className="w-12 h-12 object-contain rounded-lg"
                        />
                        <h3 className="text-xl font-bold text-white">
                            {config.theme?.name}
                        </h3>
                    </div>
                </div>
            </a>
        </Card>
    );
};

export function Ecosystem() {
    const games = Object.entries(controllerConfigs)
        .filter(([_, config]) =>
            FEATURED_GAMES.includes(config.theme?.name || "")
        )
        .map(([key, config]) => ({
            ...config,
            key,
        }));

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-8">
                <div className="text-center">
                    <h3 className="text-xl sm:text-2xl">Built with Dojo</h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-400">
                        Join a vibrant ecosystem of teams building fully onchain
                        games and applications
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {games.map((game) => (
                        <GameCard key={game.key} config={game} />
                    ))}
                </div>
            </div>
        </div>
    );
}
