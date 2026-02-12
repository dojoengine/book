export function BlogBanner() {
    return (
        <div className="relative w-full">
            {/* Banner Background */}
            <div className="h-48 relative">
                <div className="absolute inset-0 bg-[#0c0c0c] backdrop-blur-lg overflow-hidden">
                    {/* Inline SVG pattern background */}
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 800 200"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a1a" strokeWidth="1" />
                            </pattern>
                            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#EE2D3F" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#0c0c0c" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="#0c0c0c" />
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <rect width="100%" height="100%" fill="url(#glow)" />
                    </svg>
                </div>
            </div>

            {/* Circle Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-36">
                <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center">
                    {/* Inline Dojo icon SVG */}
                    <svg
                        viewBox="0 0 92 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 mb-[-6px]"
                    >
                        <path
                            d="M91.5331 0H-5.1527e-05V3.87668C-5.1527e-05 4.57124 0.291742 5.22465 0.791709 5.68291L8.98804 13.0475C10.0576 14.2422 11.5302 14.9232 13.0582 14.9232H19.5596C19.5596 14.9232 19.5736 20.312 19.5736 23.459C19.5736 26.6057 20.8616 30.0033 20.8616 30.0033L19.9837 30.8813C19.0433 29.59 14.8872 24.4688 12.1275 24.4688L1.69482 24.4133V37.7246L19.5736 37.933V64C24.1748 59.4177 28.7902 54.8497 33.3819 50.258V25.3166C33.3819 21.6027 32.558 18.5814 31.8001 15.2633L31.7984 15.2565L31.7935 15.2353L31.7882 15.2146C31.7812 15.1889 31.7752 15.1662 31.7765 15.1417C31.7774 15.1217 31.7837 15.1006 31.7984 15.076C31.8927 14.9341 32.2815 14.7925 32.6515 14.7216C32.9344 14.6676 33.206 14.6548 33.3264 14.7148C35.3092 15.6814 37.4151 16.0422 39.5989 16.0794C43.709 16.1487 47.8289 16.1481 51.939 16.0794C54.1211 16.0421 56.2255 15.6806 58.2066 14.7148C58.4845 14.5759 59.568 14.8258 59.7347 15.076C59.7764 15.1455 59.7486 15.187 59.7347 15.2565L59.733 15.2633C58.9753 18.58 58.1511 21.6352 58.1511 25.3166V50.258C62.7429 54.8497 67.3583 59.4177 71.9594 64V37.933L89.8382 37.7246V24.4133L79.4055 24.4688C76.6458 24.4688 72.4898 29.59 71.5493 30.8813L70.6715 30.0033C70.6715 30.0033 71.9594 26.6057 71.9594 23.459C71.9594 20.312 71.9734 14.9232 71.9734 14.9232H78.4748C80.0029 14.9232 81.4754 14.2422 82.545 13.0475L90.7413 5.68291C91.2413 5.22465 91.5331 4.57124 91.5331 3.87668V0Z"
                            fill="#0a1628"
                        />
                        <path
                            d="M45.7663 38.7067C41.0018 38.7067 37.1394 34.8435 37.1394 30.078C37.1394 25.3124 41.0018 21.4492 45.7663 21.4492C50.5307 21.4492 54.3931 25.3124 54.3931 30.078C54.3931 34.8435 50.5307 38.7067 45.7663 38.7067Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="text-center mt-16 mb-12">
                <h1 className="text-3xl font-bold mb-2">Dojo Blog</h1>
                <p className="text-gray-400">
                    A short blurb about the Dojo community and what it does.
                </p>
            </div>
        </div>
    );
}
