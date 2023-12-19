import Link from "next/link";

import React from "react";

function MainNavigation() {
  return (
    <header>
      <nav>
        <ul className="flex justify-center gap-x-8 bg-violet-600 text-white font-bold h-12">
          <li>
            <Link className="py-2 block" href="/">
              Home
            </Link>
          </li>
         
          {/* <li>
            <Link className="py-2 block" href="/posts">
              posts Page
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
