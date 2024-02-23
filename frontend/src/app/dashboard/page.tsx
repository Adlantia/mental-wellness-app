import {LogButton} from "@/app/dashboard/LogButton";

export default function Dashboard () {
    return (
        <>
            <section className="container mx-auto py-12">
                <LogButton buttonName = <a href='/mood'>Mood</a> />
                <LogButton buttonName = <a href='/sleep'>Sleep</a> />
                <LogButton buttonName = <a href='/journal-list'>Journal</a> />
            </section>

        </>
    )
}