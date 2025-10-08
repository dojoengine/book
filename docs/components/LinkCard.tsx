import { useState } from "react";

export const LinkCard = ({
    title,
    description,
    link,
    href,
}: {
    title: string;
    description: string;
    link?: string;
    href?: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const commonProps = {
        className: `p-4 sm:p-6 md:p-8 border border-red-600/20 rounded-xl bg-gradient-to-br from-[#181818] to-[#0c0c0c] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-2 sm:gap-4 md:gap-6 shadow-lg hover:shadow-red-600/5 duration-300 cursor-pointer relative overflow-hidden w-full sm:w-auto ${
            isHovered ? "animate-gradient-x" : ""
        }`,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    const content = (
        <>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
                <h2 className="text-base sm:text-lg md:text-xl flex items-center">
                    {title}
                    {isHovered && <span className="ml-2">→</span>}
                </h2>
            </div>
            <div>
                <p className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-white/70">
                    {description}
                </p>
            </div>
        </>
    );

    const url = href || link || "#";
    const isExternal = href !== undefined;

    return (
        <a
            href={url}
            {...(isExternal && {
                target: "_blank",
                rel: "noopener noreferrer",
            })}
            {...commonProps}
        >
            {content}
        </a>
    );
};
