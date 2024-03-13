import {Request, Response} from 'express'
import {
    insertLog,
    Log, selectLogsByLogProfileId,
} from "./log.model";
import {PublicProfile} from "../profile/profile.model";
import {Status} from "../../utils/interfaces/Status";
//import {LikeSchema} from "./like.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {z} from "zod";
import {LogSchema} from "./log.validator";
/**
 * handles POST reuqest to insert a log into the log table
 * @param request object containing the logid and the profile id
 * @param response object containing the status of the request
 * @returns status object indicating if the log was inserted
 */
export async function postLogController (request:Request, response:Response) : Promise<Response<Status>> {
    try {
        //validate the incoming request with the log schema
        const validationResult = LogSchema.safeParse(request.body)

        //if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        //if the validation succeeds, continue

        //deconstruct the log ids from the validation result
        const {logAnswer, logTrackerId} = validationResult.data

        //deconstruct the profile from the session
        const profile = request.session.profile as PublicProfile

        //deconstruct the profile id from the profile
        const logProfileId = profile.profileId as string

        //create a log object
        const log: Log = {
            logProfileId, logId: null, logDatetime: null, logAnswer, logTrackerId
        }
        //create a status object
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        //insert the log into the log table
        status.message = await insertLog(log)

        //return the status to the user
        return response.json(status)

        //if error occurs, return the error to the user
    } catch (error:any){
            return (response.json({status:500, data:null, message: error.message}))
        }
    }


// /**
//  * Handles GET request for all likes associated with a thread
//  * @param request object containing the like thread id
//  * @param response object containing the status of the request and the likes associated with the thread
//  */
// export async function getLogByLogIdController (request:Request, response: Response) : Promise <Response<Status>> {
//     try {
//         //validate incoming request with the log schema
//        // const validationResult = LogEntitySchema.safeParse(request.body)
//         const validationResult  = z.string().uuid("Please provide a valid logId").safeParse(request.params.logId)
//         //if validation fails return a response to the client
//         if(!validationResult.success){
//             return zodErrorResponse(response, validationResult.error)
//         }
//         //if validation succeeds, continue
//         const logId =  validationResult.data;
//
//         //select the logs by log id
//         const data = await selectLogByLogId(logId)
//
//         // return the status and the logs associated with the thread
//        return response.json({status: 200, message: null, data})
//
//         // if an error occurs, return the error to the user
//
//     } catch (error) {
//         return response.json ({
//             status: 500,
//             message: '',
//             data: []
//         })
//     }
// }
//
//
// /**
 /** Handles GET request for all logs associated with a profile
 * @param request object containing the log profile id
 * @param response object containing the status of the request and the logs associated with the profile
 * @returns status object containing the status of the request and the logs associated with the profile
 */



export async function getLogsByLogProfileIdController (request: Request, response: Response) :Promise <Response> {
    try{
        // //validate the logProfileId coming from the request parameters
        // const validationResult = z.string().uuid("Please provide a valid logProfileId").safeParse(request.params.logProfileId)
        //
        // //if the validation fails, return a response to the client
        // if(!validationResult.success) {
        //     return zodErrorResponse(response, validationResult.error)
        // }

        //if validation succeeds, continue

        //deconstruct the log Profile id from the request parameters
        //const logProfileId = validationResult.data
        //deconstruct the log ids from the validation result
    //    const {logAnswer, logTrackerId} = validationResult.data

        //deconstruct the profile from the session
        const profile = request.session.profile as PublicProfile

        //deconstruct the profile id from the profile
        const logProfileId = profile.profileId as string
        console.log(logProfileId)
        //select the logs by log profile id
        const data =  await selectLogsByLogProfileId(logProfileId)

        //return the status and the logs associated with the profile
        return response.json({status:200, message:null, data})

        //if an error occurs, return the error to the user
    }   catch (error) {
        return response.json({
            status: 500,
            message:'',
            data: []
        })
    }
}
// /**
//  * Handles DELETE request to delete a log from the log table
//  * @param request object containing the log thread id
//  * @param response object containing the status of the request
//  * @returns status object indicating if the log was deleted
//  */
// export async function deleteLogController(request: Request, response: Response): Promise <Response<Status>> {
//     try {
//         //validate the incoming request with the log schema
//         const validationResult =  LogSchema.safeParse(request.body)
//
//         //if the validation fails, return a response to the client
//         if(!validationResult.success) {
//             return zodErrorResponse(response, validationResult.error)
//         }
//         //if the validation succeeds, continue
//         //deconstruct the log  id from the validation result
//         const {logId} = validationResult.data
//
//         //deconstruct the profile from the session
//         const profile = request.session.profile as PublicProfile
//
//         //deconstruct the profile id from the profile
//         const logProfileId = profile.profileId as string
//
//         //create a log object
//         const log: Log = {
//             logProfileId,
//             logId, logDateTime : null
//         }
//         // create a status object
//         const status: Status = {
//             status: 200,
//             message: '',
//             data: null
//         }
//
//         //delete the log from the log table
//         status.message  = await deleteLog(log)
//
//         //return the status to the use
//         return response.json(status)
//
//         //if an error occurs, return the error to the user
//     } catch (error:any) {
//         return (response.json({
//             status: 500,
//             data:null,
//             message: error.message
//         }))
//     }
// }


