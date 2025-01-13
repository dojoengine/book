import { useRef, useEffect, useState } from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [bounds, setBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!isHovered) return;

        const card = cardRef.current;
        if (!card) return;

        setBounds(card.getBoundingClientRect());
    }, [isHovered]);

    const rotateToMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2,
        };

        setMousePosition(center);
    };

    const transform = isHovered
        ? `
            perspective(1000px)
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${mousePosition.y / 100},
                ${-mousePosition.x / 100},
                0,
                ${Math.log(Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)) * 2}deg
            )
        `
        : "";

    const glowBackground = isHovered
        ? `radial-gradient(
            circle at
            ${mousePosition.x + bounds.width / 2}px
            ${mousePosition.y + bounds.height / 2}px,
            #ffffff10,
            #ffffff03 40%,
            transparent 80%
        )`
        : `radial-gradient(
            circle at 50% -20%,
            #ffffff10,
            #ffffff03 40%,
            transparent 80%
        )`;

    return (
        <div
            ref={cardRef}
            className={`relative transform-gpu transition-all duration-300 ease-out hover:duration-150 hover:shadow-lg min-h-[100px] ${className}`}
            style={{
                transform,
                perspective: "1500px",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            onMouseMove={rotateToMouse}
        >
            {children}
            <div
                className="absolute inset-0 rounded-xl transition-opacity duration-150"
                style={{
                    backgroundImage: glowBackground,
                    opacity: isHovered ? 1 : 0.4,
                }}
            />
            <div
                className="absolute inset-0 rounded-xl bg-black/20 transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 0 : 1,
                }}
            />
        </div>
    );
}
