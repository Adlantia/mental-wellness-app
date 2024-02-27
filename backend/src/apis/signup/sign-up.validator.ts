import { z } from 'zod'
import {PrivateProfileSchema} from "../profile/profilevalidator";

export const SignUpProfileSchema = PrivateProfileSchema
.omit({profileId: true, profileActivationToken: true, profileHash: true})
.extend({
    profilePasswordConfirm: z.string(
        {
            required_error: 'passwordConfirm is required',
            invalid_type_error: 'please provide a passwordConfirm'
        }
    )
        .min(8, {message: 'please provide a valid passwordConfirm (min 8 characters)'})
        .max(32, {message: 'please provide a valid passwordConfirm (max 32 characters)'}),
    profilePassword: z.string({
        required_error: 'profilePassword is required',
        invalid_type_error: 'please provide a profilePassword'
    })
        .min(8, {message: 'please provide a valid profilePassword (min 8 characters)'})
        .max(32, {message: 'please provide a valid profilePassword (max 32 characters)'})
})

.refine(data => data.profilePassword === data.profilePasswordConfirm, {
    message: 'passwords do not match'
})