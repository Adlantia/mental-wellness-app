import { Request, Response } from "express";
import {TrackerSchema} from "./tracker.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {
    insertTracker,
    selectAllTrackers,
    selectTrackerByTrackerId,
    Tracker
} from "./tracker.model";
import {Status} from "../../utils/interfaces/Status";
import {z} from "zod";

/**
 *
 * @param request body must contain trackerId, trackerCategory and trackerQuestion
 * @param response will contain a status object with a message and data if successful or a status with error message and null data if unsuccessful
 */


export async function postTrackerController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the incoming request with the log schema
        const validationResult = TrackerSchema.safeParse(request.body)

        // if validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get log data from the request body
        const {trackerId, trackerCategory, trackerQuestion} = validationResult.data

        // insert the log into the database and store the result in a variable called result
        const result = await insertTracker({trackerId, trackerCategory, trackerQuestion})

        // return the response with the status code 200, a message, and the result as data
        const status: Status = {status: 200, message: result, data: null}
        return response.json(status)

        //if there is an error, return the response with the status 500, an error message, and null data
    } catch (error) {
        console.error(error)
        return response.status(500).json({status: 500, message: 'Error creating log. Try again.', data: null})
    }
}


/**
 *  get all trackers from the database and returns them to the user in the response
 * @param request from the client to the server to get all trackers
 * @param response response from the server to the client with all trackers or an error message
 */

export async function getAllTrackers (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // get the trackers from the database and store it in a variable called data
        const data = await selectAllTrackers()

        // return the response with the status code 200, a message, and the log as data
        const status: Status = {status: 200, message: null, data}
        return response.json(status)

    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Error getting log. Try again.',
            data: []
        })
    }
}



/**
 * get all trackers from the database by thread profile id and return them to the user in the response
 * @param request from the client to the server to get all trackers by log profile id
 * @param response from the server to the client with all trackers by log profile id or an error message
 */

export async function getTrackerByTrackerIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the incoming request TrackerProfileId with the uuid schema
        const validationResult = z.string().uuid({message: 'please provide a valid trackerId'}).safeParse(request.params.trackerId)

        // if the validation fails, return a response to the client
        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the log profile id from the request parameters
        const trackerId = validationResult.data

        //get the log from the database by log profile id and store it in a variable called data
        const data = await selectTrackerByTrackerId(trackerId)

        // return the response with the status code 200, a message, and the log as data
        return response.json({status:200, message: null, data})

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({
            status: 500,
            message: 'Error getting log by log ID. Try again.',
            data: []
        })
    }
}


