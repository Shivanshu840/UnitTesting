import express from 'express';
import {z} from 'zod';
export const app = express();
import { prismaClient } from './__mocks__/db';
app.use(express.json());

const inputSum = z.object({
    a:z.number(),
    b:z.number()
})


app.post("/sum", async(req:any,res:any) => {

    const paresedResponse = inputSum.safeParse(req.body);
    if(!paresedResponse.success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    if(paresedResponse.data.a && paresedResponse.data.b){
        const answer = paresedResponse.data.a + paresedResponse.data.b;

        
        const result = await prismaClient.sum.create({
            data: {
                a:paresedResponse.data.a,
                b:paresedResponse.data.b,
                result:answer
            }
        })

        res.status(200).json({
            answer:answer,
            id: result.id
        })
    }

     
})
