import {z} from 'zod'

export const LogSchema = z.object({
    logId: z.string({required_error: 'please provide a valid logId'}).uuid({message: 'please provide a valid uuid for logId'}).nullable(),
    logProfileId: z.string({required_error: 'please provide a valid logProfileId'}).uuid({message: 'please provide a valid uuid for logProfileId'}),
    logTrackerId : z.string({required_error: 'please provide a valid logTrackerId or null'}).uuid({message: 'please provide a valid uuid or logTrackerId'}),
    logAnswer : z.number({required_error: 'please provide a valid answer or null'}).min(0).max(5),
    logDatetime: z.coerce.date({required_error: 'please provide a valid logDatetime or null'}).nullable()
})

export type Log = z.infer<typeof LogSchema>