
import { currentServerRole } from "@/lib/serverAuthState";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import TaskSchema from "@/schemas/task";
import db from "@/lib/db";
import { currentServerUser } from "@/lib/serverAuthState";


export async function POST(req) {
    const role = await currentServerRole()
    if (role === UserRole.PARTICIPANT) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 }
        );
    }

    const body = await req.json()

    const convertedBody = {
        ...body,
        deadline: new Date(body.deadline),
        noOfTasks: parseInt(body.noOfTasks, 10),
    };


    const result = TaskSchema.safeParse(convertedBody);


    if (!result.success) {
        return new NextResponse(
            JSON.stringify({ error: 'invalid fields' }),
            { status: 402 }
        );
    }

    const { title, description, deadline, noOfTasks } =
        result.data;
    const user = await currentServerUser()
    try {
        const newAdminTask = await db.adminTask.create({
            data: {
              title,
              description,
              deadline,
              noOfTasks,
              track: user.track,
              author: { connect: { id: user.id, } }, 
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
        JSON.stringify({ success: 'task created' }),
        { status: 200 }
    );
}

export async function GET(req) {
    const role = await currentServerRole()
    if (role !== UserRole.ADMIN) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 }
        );
    }


    try {
        const adminTasks = await db.adminTask.findMany();
        return new NextResponse(JSON.stringify(adminTasks), { status: 200 })
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({
            message: "An error occurred while fetching tasks.",
            error,
        }), { status: 401 })
    }
}
