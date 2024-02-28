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



