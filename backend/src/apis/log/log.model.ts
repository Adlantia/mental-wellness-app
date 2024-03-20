import {z} from 'zod'
import {LogSchema} from "./log.validator";
import {sql} from "../../utils/database.utils";

// The shape of a log object
export type Log = z.infer<typeof LogSchema>

/**
 * inserts a log into the log table and returns a message
 * @param log to be inserted
 * @returns 'log successfully posted'
 */
export async function insertLog(log: Log): Promise<string> {

    // deconstruct the log object
    const {logProfileId, logTrackerId, logAnswer} = log

    // insert the log into the log table
    await sql`INSERT INTO log(log_id, log_profile_id, log_tracker_id, log_answer,log_datetime)
              VALUES (gen_random_uuid(), ${logProfileId}, ${logTrackerId}, ${logAnswer}, NOW())`

    // return a message to the user indicating success
    return `Successfully recorded!`
}

/**
 * selects logs from the log table by logProfileId and returns the logs
 * @param logProfileId to be selected by logProfileId
 * @returns the logs that were selected
 */
export async function selectLogsByLogProfileId(logProfileId: string): Promise<Log[]> {

    // select the logs from the log table by logProfileId
    const rowList = <Log[]>await sql`SELECT log_id, log_profile_id,log_tracker_id,log_answer, log_datetime
                                      FROM log
                                      WHERE log_profile_id = ${logProfileId}`
            console.log(rowList)
    // parse the result into an array of logs and return it
    return LogSchema.array().parse(rowList)
}