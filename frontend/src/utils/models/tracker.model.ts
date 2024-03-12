
import {z} from "zod";

export const TrackerSchema = z.object({
    trackerId: z.string({required_error: 'please provide a valid trackerID or null'}).uuid({message: 'please provide a valid uuid for trackerId'}),
    trackerCategory: z.string().max(32, {message: 'please provide a valid trackerCategory'}),
    trackerQuestion: z.string().max(128, {message: 'please provide a valid trackerQuestion'})

})

export type Tracker = z.infer<typeof TrackerSchema>
