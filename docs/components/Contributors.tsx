import { useEffect, useState, useCallback } from "react";

interface Contributor {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

export function Contributors() {
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

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-12 mb-16">
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
    );
} 