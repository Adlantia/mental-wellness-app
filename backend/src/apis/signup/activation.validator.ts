
import {z} from "zod";

/**
 * the shape of the data that comes from the client when activating a profile
 *@property profileAcivationToken {string} the profile's activation token
 */
export const activationProfileSchema = z.object({activation:z.string().length(32, {message: 'please provide a valid profileActivationToken'})})