import type { Handler,APIGatewayProxyEvent,APIGatewayProxyResult } from "aws-lambda";
import {v4 as uuidv4} from "uuid"
import validMimes from "../../mime/supportedFormats"
import type {UploadVideoResponseBody} from "../../types/video/upload";
import {S3ClientConfig,S3Client,PutObjectCommand, PutObjectRequest} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {UploadVideoRequestBody,uploadVideoBodySchema} from "../../validation/video/upload";
const options:S3ClientConfig={
    region:'ap-south-1'
}
const s3=new S3Client(options);

const VideoUpload :Handler<APIGatewayProxyEvent,APIGatewayProxyResult> = async (event)=>{
    

    const validate = uploadVideoBodySchema.safeParse(JSON.parse(event.body || "{}"));
    if(!validate.success){
        return{
            statusCode:403,
            body:JSON.stringify({message:"Validation error"})
        }
    }
    const {ext} =validate.data;
     
    if(!validMimes[ext as keyof typeof validMimes]){
        return{
            statusCode:403,
            body:JSON.stringify({message:"invalid mime"})
        }       
    }
    const videoId=uuidv4();
    const videoKey=`uploads/${videoId}.${ext}`
    // const url=s3.getSignedUrl('putObject',{
    //     Bucket:'raw-video-cj',
    //     Key:videoKey,
    //     Expires: 300,
    //     ContentType:validMimes[ext as keyof typeof validMimes]
    // })
    const putReq:PutObjectRequest={
        Bucket: 'raw-video-cj',
        Key:videoKey,
    }
    const command= new PutObjectCommand(putReq);
    const url = await getSignedUrl(s3,command,{expiresIn:300});
    const responseBody:UploadVideoResponseBody={
        encodedUrl:url,key:videoKey,videoId:videoId
    }
    return {
        statusCode:201,
        body:JSON.stringify(responseBody)
    }
}

export const handler=VideoUpload;