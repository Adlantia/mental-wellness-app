import { z } from 'zod'

export const ProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide a valid profileId'
    })
        .uuid({message: 'please provide a valid profileId'}),

    profileEmail: z.string({
        required_error: 'profile email is a required field.',
        invalid_type_error: 'please provide a valid profile email'
    })
        .email({message: 'please provide a valid email'})
        .max(128, {message: 'profile email length is too long'}),


    profileHash: z.string({
        required_error: 'profileHash is required',
        invalid_type_error: 'please provide a valid profileHash'
    })
        .length(97, {message: 'profile hash must be 97 characters'}),

    profileName: z.string({
        required_error: 'profile name is required',
        invalid_type_error: 'please provide a profile name'
    })
        .trim()
        .min(1, {message: 'please provide a valid profile name (min 1 characters)'})
        .max(32, {message: 'please provide a valid profile name (max 32 characters)'})
})

export const SignInSchema = z.object({
    profileEmail: z
        .string({required_error: "profileEmail is required", invalid_type_error: "please provide a valid profile email"})
        .email({message: 'please provide a valid email'})
        .max(128, {message: 'please provide a valid email (max 128 characters)'}),

    profilePassword: z
        .string({required_error: "profile password is required", invalid_type_error: "please provide a valid password"})
        .min(8, {message: 'please provide a valid password (min 8 characters)'})
        .max(32, {message: 'please provide a valid password (max 32 characters)'}),
})

export const SignUpSchema = ProfileSchema
    .merge(SignInSchema)
    .extend({
        profileName: z
            .string({required_error: "Profile Name is required"})
            .min(1, {message: 'please provide a valid profile name (min 1 characters'})
            .max(32, {message: 'please provide a valid profile name (max 32 characters'})
    })

