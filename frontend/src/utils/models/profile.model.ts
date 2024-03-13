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
        .string({required_error: "profile Email is required", invalid_type_error: "please provide a valid profile email"})
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
        profileId: z.string({
            required_error: 'profileId is required',
            invalid_type_error: 'Please provide a valid profileId'
        })
            .uuid({message: 'please provide a valid profileId'}).nullable(),
        profileName: z
            .string({required_error: "Profile Name is required"})
            .min(1, {message: 'please provide a valid profile name (min 1 characters'})
            .max(32, {message: 'please provide a valid profile name (max 32 characters'}),
        profilePasswordConfirm: z
            .string({required_error: "profile password is required", invalid_type_error: "please provide a valid password"})
            .min(8, {message: 'please provide a valid password (min 8 characters)'})
            .max(32, {message: 'please provide a valid password (max 32 characters)'})
    })

    .refine(data => data.profilePassword === data.profilePasswordConfirm, {
        message: 'passwords do not match'
    })

export type Profile = z.infer<typeof ProfileSchema>
export type SignIn = z.infer<typeof SignInSchema>
export type SignUp = z.infer<typeof SignUpSchema>