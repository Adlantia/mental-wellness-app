import {z} from 'zod'

export const JournalSchema = z.object({
    journalId: z.string({required_error: 'Please enter a valid journal id or null'}).uuid({message: 'Please provide a valid uuid for journalId'}).nullable(),
    journalProfileId: z.string({required_error: 'Please enter a valid profile id'}).uuid({message: 'Please provide a valid uuid for journalProfileId'}),
    journalDateTime: z.string({required_error: 'Please enter a valid date and time'}).datetime({message: 'Please provide a valid date and time for journalDatetime'}).nullable(),
    journalText: z.string({required_error: 'Please enter a valid journal text'}).max(2048, {message: 'Journal text must be less than 2048 characters long'}),
    journalTitle: z.string({required_error: 'Please enter a valid journal title'}).max(128, {message: 'Journal title must be less than 128 characters long'})
})
