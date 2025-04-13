export interface UploadVideoRequestBody{
    ext:string
}

export interface UploadVideoResponseBody{
    encodedUrl:string,
    key:string,
    videoId:string
}