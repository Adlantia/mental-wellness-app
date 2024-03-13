// 'use server'
//
// import {Profile, ProfileSchema} from "@/utils/models/log.model";
//
// export async function fetchProfileByProfileId(): Promise<Profile[]>{
//     const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/profile`)
//         .then((response:Response) => {
//             if(!response.ok) {
//                 throw new Error('Error fetching profile')
//             } else {
//                 return response.json()
//             }
//         })
//             return ProfileSchema.array().parse(data)
// }