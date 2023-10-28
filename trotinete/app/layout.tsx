import React, {ReactNode} from 'react';

import '../styles/globals.css';

// @ts-ignore
import Nav from "../components/Nav";
// @ts-ignore
import Footer from "../components/Footer";



export const metadata = {
  title: "Scooter Rental",
  description: "An app that allows you to rent a scooter",
  icons: {
    icon: "./favicon.ico",
  },
}

function RootLayout({children}: { children: ReactNode }) { // Explicitly define children type as ReactNode
  return (
      <html lang="en">
      <body>
      <div className='main'>
        <div className='gradient'/>
      </div>
      <main className='app'>
        <Nav/>
        {children}
        <Footer/>
      </main>
      </body>
      </html>
  );
}

export default RootLayout;