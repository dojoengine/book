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

import Torii from "../public/torii-icon.svg?react";
import Katana from "../public/katana-icon.svg?react";
import Origami from "../public/origami-icon.svg?react";

import { Link, type LinkProps } from "react-router-dom";

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
    title: "Community",
    description: "Join the Dojo community and get help from other developers.",
    icon: <Dojo className="w-8" />,
    link: "/docs/getting-started",
  },
];

const sdkContent = [
  {
    icon: <Javascript className="w-6" />,
    title: "Javascript",
  },
  {
    icon: <Rust className="w-6" />,
    title: "Rust",
  },
  {
    icon: <Unity className="w-6" />,
    title: "Unity",
  },
  {
    icon: <Godot className="w-6" />,
    title: "Godot",
  },
  {
    icon: <Bevy className="w-6" />,
    title: "Bevy",
  },
  {
    icon: <Dojo className="w-6" />,
    title: "C",
  },
];

const sponsorContent = [
  { icon: <Cartridge className="w-48" />, link: "https://cartridge.gg/" },
  { icon: <Starkware className="w-48" />, link: "https://starkware.co/" },
  { icon: <Starknet className="w-48" />, link: "https://starknet.io/" },
  { icon: <Celestia className="w-32" />, link: "https://celestia.org/" },
];

export function HomePage() {
  return (
    <div>
      <div className="border-y border-white/20 py-20 border-[#252525]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row gap-8 sm:gap-20">
          <div className="self-center p-6 sm:p-8 border border-[#252525] rounded-xl ">
            <Dojo className="w-16 sm:w-24" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">Dojo Documentation</h1>
            <p className="text-lg sm:text-xl mt-4">
              Dojo is a framework designed to make building provable and onchain
              games easy.
            </p>
            <div className="mt-6 relative">
              <pre className="p-4 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden overflow-x-auto">
                <code className="text-sm sm:text-base ">
                  curl -L https://install.dojoengine.org | bash
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
      <div className="container mx-auto p-4 sm:p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {cardContent.map((card, index) => (
            <Link
              to={card.link}
              key={index}
              className="p-6 sm:p-8 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden"
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
      </div>
      <div className="container mx-auto p-4 sm:p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 self-center">
            <h3 className="text-xl sm:text-2xl">Client SDKs</h3>
            <p className="mt-2 text-sm sm:text-base">
              Works with all your favourite libraries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 lg:col-span-9">
            {sdkContent.map((card, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 border border-[#252525] rounded-xl bg-[#181818] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-4 sm:gap-8 shadow-lg hover:shadow-red-600/5 duration-150 hover:bg-[#0c0c0c] hover:bg-opacity-50 cursor-pointer relative overflow-hidden"
              >
                <div className="flex gap-4 items-center">
                  {card.icon}{" "}
                  <h2 className="text-lg sm:text-xl">{card.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 self-center">
            <h3 className="text-xl sm:text-2xl">Sponsors</h3>
            <p className="mt-2 text-sm sm:text-base">
              Supported by the following companies.
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
    </div>
  );
}
