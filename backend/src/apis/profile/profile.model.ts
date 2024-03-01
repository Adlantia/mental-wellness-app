import { z } from 'zod'
import {PrivateProfileSchema} from "./profilevalidator";
import {sql} from "../../utils/database.utils";

/**
 *  The shape of the private profile that is only used on the backend
 *  @property profileId {string} the primary key
 *  @property profileEmail {string} the profile's email
 *  @property profileActivationToken {string|null} the profile's activation token
 *  @property profileHash {string} the profile's hash
 *  @property profileName {string} the profile's name
 */


export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

export async function insertProfile (profile: PrivateProfile): Promise<string> {

    const {profileId, profileEmail, profileActivationToken, profileHash, profileName} = profile
    await sql`INSERT INTO profile(profile_id, profile_email, profile_activation_token, profile_hash,
                                  profile_name)
              VALUES (gen_random_uuid(), ${profileEmail}, ${profileActivationToken},
                      ${profileHash}, ${profileName})`
    return 'Profile Successfully Created'
}

/**
 * updates a profile in the profile table
 * @param profile
 * @returns {Promise<string>} 'Profile successfully updated'
 */
export async function updateProfile (profile: PrivateProfile): Promise <string> {
    const {profileId, profileActivationToken, profileEmail, profileHash, profileName} = profile
    await sql `update profile set profile_activation_token = ${profileActivationToken}, profile_email = ${profileEmail}, profile_hash = ${profileHash}, profile_name = ${profileName} where profile_id = ${profileId}`
    return 'Profile successfully updated'
}
/**
 * selects a profile from the profile table by profileActivationToken
 * @param profileActivationToken the profile's activation token to search for in the profile table
 * @return profile or null if no profile was found
 */
export async function selectPrivateProfileByProfileActivationToken (profileActivationToken: string): Promise<PrivateProfile|null> {
    const rowList =  await sql `select profile_id, profile_activation_token, profile_email, profile_hash, profile_name from profile where profile_activation_token = ${profileActivationToken}`
    const result = PrivateProfileSchema.array().max(1).parse(rowList)
    return result?.length === 1 ? result[0] : null
}

/**
 * Selects the privateProfile from profile table by profileEmail
 * @param profileEmail - the profile's email to search for
 * @returns Profile or null if no profile was found
 */

export async function selectPrivateProfileByProfileEmail(profileEmail: string): Promise<PrivateProfile | null> {
    //create prepared statement  that selects profile by profileEmail and execute
    const rowlist = await sql`SELECT profile_id, profile_activation_token, profile_email, profile_hash, profile_name FROM profile WHERE profile_email = ${profileEmail}`

    //enforce that the result is array length one or null
    const result = PrivateProfileSchema.array().max(1).parse(rowlist)

    //return the profile or null if none found
    return result?.length === 1 ? result[0] : null
}
