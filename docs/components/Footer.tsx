import * as React from "react";

export function Footer() {
    return (
        <div className="footer mx-auto container border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center py-8 px-4 sm:px-6 lg:px-12">
                <div className="mb-4 sm:mb-0">
                    Released under the MIT License.
                </div>
                <div>Copyright © 2022-Present Dojo</div>
            </div>
        </div>
    );
}
