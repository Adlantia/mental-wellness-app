import {z} from 'zod'
import {JournalSchema} from "./journal.validator"
import {sql} from "../../utils/database.utils"

/**
 * The shape of the journal entry in the journal table in the database
 * @property journalId {string} the primary key
 * @property journalProfileId {string} the foreign key to the profile table
 * @property journalDateTime {Date} the date of the journal entry
 * @property journalText {string} the journal entry
 * @property journalTitle {string} the title of the journal entry
 */

export type Journal = z.infer<typeof JournalSchema>

/**
 * Create a new journal entry
 * @param journal {Journal} the journal entry to create
 * @returns {Promise<Journal>} the created journal entry
 * @throws {Error} if the journal entry could not be created
 */

export async function createJournal(journal: Journal): Promise<string> {
    const {journalId, journalProfileId, journalDateTime, journalText, journalTitle} = journal

    await sql`INSERT INTO journal (journal_id, journal_profile_id, journal_date_time, journal_text, journal_title) 
              VALUES (gen_random_uuid(), ${journalProfileId}, now(), ${journalText}, ${journalTitle})`

    return "Journal entry created successfully"
}



/**
 * Get all journal entries for a profile
 * @returns {Promise<Journal[]>} a list of journal entries
 */

export async function selectJournalEntries(): Promise<Journal[]> {
    const rowList = <Journal[]> await sql`SELECT journal_id, journal_profile_id, journal_date_time,journal_text, journal_title FROM journal`
    return JournalSchema.array().parse(rowList)
}

export async function selectJournalsByJournalProfileId(journalProfileId: string): Promise<Journal[]> {

    // select the journal from the journal table by journalProfileId
    const rowList = <Journal[]>await sql`SELECT journal_id, journal_profile_id, journal_date_time,journal_text, journal_title
                                      FROM journal
                                      WHERE journal_profile_id = ${journalProfileId}`
    console.log(rowList)
    // parse the result into an array of journal entries and return it
    return JournalSchema.array().parse(rowList)
}