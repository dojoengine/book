import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="bg-[--vocs-color-background] text-white">
            <div className="container py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <div className="text-left order-2 lg:order-1">
                        <h1 className="text-4xl font-bold mb-4">
                            TOOLCHAIN FOR
                            <br />
                            PROVABLE APPLICATIONS
                        </h1>

                        <p className="text-lg mb-8 text-gray-400">
                            Ship onchain games faster by focusing on what
                            matters: novel new game mechanics and distribution
                            models enabled by blockchains. Dojo provides a
                            comprehensive toolchain for developing provable
                            games, applications and autonomous worlds.
                        </p>

                        <div className="mb-8">
                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        "curl -L https://install.dojoengine.org | bash"
                                    )
                                }
                                className="w-full text-left group"
                            >
                                <pre className="p-5 rounded-xl bg-[#181818] backdrop-filter backdrop-blur-lg shadow-lg group-hover:shadow-red-600/5 duration-150 group-hover:bg-[#202020] transition-colors relative overflow-hidden overflow-x-auto flex justify-between items-center">
                                    <code className="text-sm sm:text-base">
                                        curl -L https://install.dojoengine.org |
                                        bash
                                    </code>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-4 opacity-50 group-hover:opacity-100 transition-opacity"
                                    >
                                        <rect
                                            x="9"
                                            y="9"
                                            width="13"
                                            height="13"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                </pre>
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to="/docs"
                                className="px-6 py-2 bg-[#FF4136] hover:bg-[#E63A30] rounded-md transition-colors font-bold"
                            >
                                Documentation
                            </Link>

                            <a
                                href="https://github.com/dojoengine/dojo"
                                className="px-6 py-2 border border-[#FF4136] hover:bg-[#FF4136]/10 rounded-md transition-colors font-bold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </div>
                    </div>

                    {/* Right image */}
                    <div className="hidden lg:block order-1 lg:order-2">
                        <div className="w-full aspect-square relative flex items-center justify-center">
                            <div className="rounded-xl flex items-center justify-center">
                                <img
                                    src="/dojo-icon.svg"
                                    alt="Dojo Engine"
                                    className="w-[30%] h-[30%] rounded-xl sm:w-[70%] sm:h-[70%]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
