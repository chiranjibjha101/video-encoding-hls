import {z} from "zod";

export const uploadVideoBodySchema = z.object({
    ext:z.string()
});


export type UploadVideoRequestBody =z.infer<typeof uploadVideoBodySchema>;