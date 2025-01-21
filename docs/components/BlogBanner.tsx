export function BlogBanner() {
    return (
        <div className="relative w-full">
            {/* Banner Background */}
            <div className="h-48 relative">
                <div className="absolute inset-0 bg-[#0c0c0c] backdrop-blur-lg overflow-hidden">
                    <img
                        src="/blog-banner.svg"
                        alt="Blog Banner Pattern"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Circle Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-36">
                <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center">
                    <img
                        src="/dojo-navy-icon.svg"
                        alt="Dojo Logo"
                        className="w-12 h-12 mb-[-6px]"
                    />
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
