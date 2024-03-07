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
    return 'log successfully entered'
}
//
// /**
//  * selects a log from the log table by logId and returns the log
//  * @param log to be selected by logId
//  * @returns the log that was selected
//  * @returns null if no log was found
//  */
// export async function selectLogByLogId(log: log): Promise<log | null> {
//
//     // deconstruct the log object
//     const {logProfileId, logThreadId} = log
//
//     // select the log from the log table by logId
//     const rowList = <log[]>await sql`SELECT log_profile_id, log_thread_id, log_datetime
//                                       FROM "log"
//                                       WHERE log_profile_id = ${logProfileId}
//                                         AND log_thread_id = ${logThreadId}`
//
//     // parse the result into an array of logs
//     const result = logSchema.array().max(1).parse(rowList)
//
//     // return the log that was selected
//     return result.length === 0 ? null : result[0]
// }
//
// /**
//  * deletes a log from the log table and returns a message
//  * @param log to be deleted
//  * @returns 'log successfully deleted'
//  */
// export async function deleteLog(log: log): Promise<string> {
//
//     // deconstruct the log object
//     const {logProfileId, logThreadId} = log
//
//     // delete the log from the log table
//     await sql`DELETE
//               FROM "log"
//               WHERE log_profile_id = ${logProfileId}
//                 AND log_thread_id = ${logThreadId}`
//
//     // return a message to the user indicating success
//     return 'log successfully deleted'
// }
//
//
// /**
//  * selects logs from the log table by logThreadId and returns the logs
//  * @param logThreadId
//  * @returns the logs that were selected
//  */
// export async function selectLogsByLogThreadId(logThreadId: string): Promise<log[]> {
//
//     // select the logs from the log table by logThreadId
//     const rowList = <log[]>await sql`SELECT log_profile_id, log_thread_id, log_datetime
//                                       FROM "log"
//                                       WHERE log_thread_id = ${logThreadId}`
//
//     // parse the result into an array of logs and return it
//     return logSchema.array().parse(rowList)
// }
//
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