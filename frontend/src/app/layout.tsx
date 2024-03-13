import type { Metadata } from 'next'
import './globals.css'
import {Navigation} from "@/app/Navigation";
import {Footer} from "@/app/Footer";


export const metadata: Metadata = {
    title: 'Mental Wellness App',
    description: 'description goes here',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html  lang="en" suppressHydrationWarning>
        <body>
        <div className="min-h-screen">
            <Navigation />
            {children}
        </div>
        <Footer />
        </body>
        </html>
    )
}