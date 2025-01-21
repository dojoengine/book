import { Fragment } from "react";
import { posts } from "virtual:blog";
import { Link } from "react-router-dom";

interface BlogPost {
    title: string;
    path: string;
    description: string;
    date: string;
    authors?: string[];
    banner?: string;
}

function AuthorList({ authors, date }: { authors?: string[]; date: string }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
            {authors && authors.length > 0 && (
                <>
                    {authors[0].match(/\[(.*?)\]/)?.[1]}
                    <div>·</div>
                </>
            )}
            <div>{date}</div>
        </div>
    );
}

export function BlogPosts() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: BlogPost, index) => {
                return (
                    <Fragment key={index}>
                        <div className="group flex flex-col rounded-xl bg-[#0c0c0c] bg-opacity-30 backdrop-blur-lg overflow-hidden border border-white/5 hover:border-red-500/20 transition-all duration-300">
                            <Link
                                to={post.path}
                                className="flex flex-col h-full"
                            >
                                <div className="aspect-[1.91/1] w-full bg-[#1a1a1a] overflow-hidden">
                                    {post.banner ? (
                                        <img
                                            src={post.banner}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <img
                                            src="/blog-banner.svg"
                                            alt="Default banner"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm flex-1">
                                        {post.description}
                                    </p>
                                    <AuthorList
                                        authors={post.authors}
                                        date={post.date}
                                    />
                                </div>
                            </Link>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}
