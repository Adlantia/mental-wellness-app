import type { Metadata } from 'next'
import '../globals.css'
<<<<<<< HEAD
import {Navigation} from "@/app/Navigation";
=======
import {Footer} from "@/app/Footer";
>>>>>>> footer


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
<<<<<<< HEAD
        <Navigation />
        {children}
=======
        {children}
        <Footer />
>>>>>>> footer
        </body>
        </html>
    )
}