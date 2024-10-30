import { Fragment } from "react";
import { posts } from "virtual:blog";
import { Link } from "react-router-dom";

export function BlogPosts() {
    return (
        <div className="grid grid-cols-1 gap-8">
            {posts.map((post, index) => (
                <Fragment key={index}>
                    <div className="p-4 sm:p-6 md:p-8 border border-white/5 rounded-xl bg-[#0c0c0c] bg-opacity-30 backdrop-filter backdrop-blur-lg gap-2 sm:gap-4 md:gap-6 shadow-lg hover:shadow-red-600/5 duration-300 cursor-pointer relative overflow-hidden w-full sm:w-auto">
                        <Link to={post.path}>
                            <h2 className="text-3xl">{post.title}</h2>
                            {/* <Authors authors={post.authors} date={post.date} /> */}
                            <p>
                                {post.description} <span>[→]</span>
                            </p>
                        </Link>
                    </div>
                </Fragment>
            ))}
        </div>
    );
}
