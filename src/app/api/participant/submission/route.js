
import { currentServerRole } from "@/lib/serverAuthState";
import { UserRole, TaskStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import TaskSchema from "@/schemas/task";
import db from "@/lib/db";
import { currentServerUser } from "@/lib/serverAuthState";


export async function POST(req) {
    const role = await currentServerRole()
    if (role !== UserRole.PARTICIPANT) {
        return new NextResponse(
            JSON.stringify({ error: "Not allowed" }),
            { status: 403 }
        );
    }

    const body = await req.json()

    // const convertedBody = {
    //     ...body,
    //     deadline: new Date(body.deadline),
    //     noOfTasks: parseInt(body.noOfTasks, 10),
    //     taskGrade: parseInt(body.taskGrade, 10),
    // };


    // const result = TaskSchema.safeParse(convertedBody);


    // if (!result.success) {
    //     return new NextResponse(
    //         JSON.stringify({ error: 'invalid fields' }),
    //         { status: 402 }
    //     );
    // }

    const { submissionLink, taskId, participantId } =
        body;
    const user = await currentServerUser()
    try {
        const newSubission = await db.submission.create({
            data: {
                taskId,
                participantId,
                submissionLink,
                status: TaskStatus.SUBMITTED
            },
        })

    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: 'Error creating task' }),
            { status: 500 }
        );
    }

    return new NextResponse(
        JSON.stringify({ success: 'submission successful' }),
        { status: 200 }
    );
}