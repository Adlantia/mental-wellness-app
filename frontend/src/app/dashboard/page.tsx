import {LogButton} from "@/app/dashboard/LogButton";

export default function Dashboard () {
    return (
        <>
            <section className="container mx-auto py-12">
                <LogButton buttonName = 'Mood'/>
                <LogButton buttonName = 'Sleep'/>
                <LogButton buttonName = 'Journal'/>
                </section>

        </>
    )
}