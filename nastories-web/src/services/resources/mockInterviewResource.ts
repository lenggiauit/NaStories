import { EventBookingDateResource } from "./eventBookingDateResource";

export type MockInterviewResource =
{
    id  : any,
    fullName  : any, 
    email  : any, 
    ageRange  : any, 
    fullname: any, 
    language: any,
    resume: any,
    coverLetter: any,
    jobDescription: any,  
    note: any,
    eventBookingDateId: any
    eventBookingDate? : EventBookingDateResource,  
    eventStatus  : any,
    isEnableRequestChange: boolean,
    isEnableDelete: boolean,
    code: any,
    redeemCode: any,
}