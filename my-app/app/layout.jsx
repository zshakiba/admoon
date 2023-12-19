import React from "react";
import "../styles/globals.css";
import MainNavigation from "./MainNavigation";

function layout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next-13 Demo</title>
      </head>
      <body>
        <MainNavigation />
        {children}
      </body>
    </html>
  );
}

export default layout;
