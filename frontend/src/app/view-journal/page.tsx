import {Journal} from "@/app/shared/Journal";

export default function ViewJournalEntry (){
    const journalEntry =
        {
            journalId: 'd96b4953-4d15-4cf7-90d2-25b32d3bb2b2',
            journalProfileId: '891f85a2-c9ff-45b7-b988-d62c02aedd10',
            journalTitle: 'Day 1',
            journalDateTime: '01/12/2001',
            journalText: 'Today has been an unexpectedly exciting day, filled with both mundane routines and fascinating surprises. As I sit down to pen down my thoughts, I can\'t help but marvel at the unpredictability of life.\n' +
                '\n' +
                'The day started like any other – a quick breakfast, a rush to catch the morning bus, and the usual humdrum of office life. However, little did I know that a series of intriguing events awaited me.\n' +
                '\n' +
                'Morning Commute Anomalies\n' +
                '\n' +
                'As I boarded the bus, I noticed an unusual sight – a street performer with a saxophone, playing a jazzy tune at the bus stop. The music added a surreal touch to the otherwise ordinary morning rush. People seemed to pause, if only for a moment, to appreciate the unexpected joy that this impromptu concert brought. It was a reminder that beauty and surprise can be found in the most routine of places.\n' +
                '\n' +
                'Office Antics and Coffee Mishap\n' +
                '\n' +
                'Work at the office was both productive and filled with laughter. My colleagues decided to break the monotony by organizing a surprise birthday celebration for our team lead. The camaraderie and joy in the office were infectious, making the work environment feel more like a community than just a place of business.\n' +
                '\n' +
                'However, the day took a comedic turn when, in the midst of celebrating, a colleague accidentally knocked over a tray of coffee cups. What could have been a disaster turned into a hilarious coffee mishap, with everyone joining in the laughter and helping to clean up the mess. It\'s moments like these that turn ordinary workdays into unforgettable memories.'
        }

    return (
        <>
            <header style={{fontSize: '24px', margin: '20px 0', textAlign: 'center'}}>
                Journal
            </header>
            <div className = "p-4">
                <div className="flex">
                        <p>
                        <Journal  journal={journalEntry}/>
                            </p>
                </div>
            </div>
        </>
    )
}
