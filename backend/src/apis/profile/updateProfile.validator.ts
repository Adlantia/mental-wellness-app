import { z } from 'zod'

export const UpdateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide a valid profileId'
    })
        .uuid({message: 'please provide a valid profileId'}),
    profileName: z.string({
        required_error: 'profile name is required',
        invalid_type_error: 'please provide a profile name'
    })
        .trim()
        .min(1, {message: 'please provide a valid profile name (min 1 characters)'})
        .max(32, {message: 'please provide a valid profile name (max 32 characters)'}),

    profilePasswordConfirm: z.string({
            required_error: 'passwordConfirm is required',
            invalid_type_error: 'please provide a passwordConfirm'
                }
            )
                .min(8, {message: 'please provide a valid passwordConfirm (min 8 characters)'})
                .max(32, {message: 'please provide a valid passwordConfirm (max 32 characters)'}).nullable(),
    profilePassword: z.string({
        required_error: 'profilePassword is required',
        invalid_type_error: 'please provide a profilePassword'
            })
                .min(8, {message: 'please provide a valid profilePassword (min 8 characters)'})
                .max(32, {message: 'please provide a valid profilePassword (max 32 characters)'}).nullable()
        })

        .refine(data => data.profilePassword === data.profilePasswordConfirm, {
            message: 'passwords do not match'
})