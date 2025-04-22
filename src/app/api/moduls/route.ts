import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/app/lib/session";
import { ModulsDAL } from "@/app/lib/data-access/moduldal";

const moduldal = new ModulsDAL();


export async function GET(request: NextRequest){
    try{
        const session = await getSession(request);
        if(!session || session.role !== "Guru"){

        }
    }catch(){
        
    }
}