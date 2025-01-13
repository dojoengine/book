import { Header } from "./Header";
import { Ecosystem } from "./Ecosystem";
import { HomeCards } from "./HomeCards";
import { Partners } from "./Partners";

export function HomePage() {
    return (
        <div
            style={{
                paddingLeft:
                    "calc(var(--vocs_DocsLayout_leftGutterWidth) - var(--vocs-sidebar_width) + var(--vocs-sidebar_horizontalPadding))",
                paddingRight:
                    "calc(var(--vocs_DocsLayout_leftGutterWidth) - var(--vocs-sidebar_width) + var(--vocs-sidebar_horizontalPadding))",
            }}
        >
            <Header />
            <div className="flex flex-col gap-24">
                <HomeCards />
                <Ecosystem />
                <Partners />
            </div>
        </div>
    );
}
