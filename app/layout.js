import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-ibm-plex-mono",
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
        className={`${ibmPlexMono.variable} antialiased`} style={{fontFamily: `${ibmPlexMono.style.fontFamily}`}}
      >
        {children}
      </body>
    </html>
  );
}
