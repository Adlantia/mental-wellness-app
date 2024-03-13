import {TrackerSchema} from "./tracker.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";



export type Tracker = z.infer<typeof TrackerSchema>

/**
 *  post a log in the log table in the database, returns a message that says 'Tracker successfully posted'
 * @param tracker
 * @returns 'Tracker successfully posted'
 */
export async function insertTracker(tracker: Tracker): Promise<string> {

    // deconstruct the thread object
    const {trackerId, trackerCategory, trackerQuestion} = tracker

    // insert the log into the log table
    await sql`INSERT INTO tracker (tracker_id, tracker_category, tracker_question)
    VALUES (gen_random_uuid(), ${trackerCategory}, ${trackerQuestion})`

    // return a message that says 'Tracker successfully posted'
    return 'Tracker successfully posted'
}

/**
 *  get all trackers from the log table in the database and return them to the user in the response
 *  @returns {Promise<Tracker[]>}
 *
 */
export async function selectAllTrackers(): Promise<Tracker[]> {
    // get all the threads from the thread table in the database and return them
    const rowList = <Tracker[]>await sql`SELECT tracker_id, tracker_category, tracker_question 
    FROM tracker`

    // parse the threads from the database into an array of Tracker objects
    return TrackerSchema.array().parse(rowList)
}


/**
 * get the log from the log table in the database by trackerId and return it
 * @param trackerId {string} the log's id to search for in the log table
 * @returns <Tracker|null> the log that has the trackerId or null if no log is found
 */

export async function selectTrackerByTrackerId(trackerId: string): Promise<Tracker | null> {
    // get the log from the log table in the database by trackerId
    const rowList = <Tracker[]>await sql`SELECT 
    tracker_id, tracker_category, tracker_question 
    FROM tracker
    WHERE tracker_id = ${trackerId}`

    // parse the log from the database into a log object
    const result = TrackerSchema.array().max(1).parse(rowList)

    //return the log or null if no log is found
    return result.length === 0 ? null : result[0]
}