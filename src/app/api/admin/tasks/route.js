
import { currentServerRole } from "@/lib/serverAuthState";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import TaskSchema from "@/schemas/task";
import db from "@/lib/db";
import { currentServerUser } from "@/lib/serverAuthState";

export async function POST(req) {
    const role = await currentServerRole()
    if (role !== UserRole.ADMIN) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 } 
        );
    }

    const body = await req.json()

    // console.log(body);

    const result = TaskSchema.safeParse(body);

    console.log(result);

    if (!result.success) {
        return { error: "Invalid fields!" };
    }

    const { title, description, deadline, noOfTasks } =
        result.data;
    const user = await currentServerUser()
    try {
        await db.adminTasks.create({
            data: {
                title,
                description,
                deadline,
                noOfTasks,
                track: user.track
            },
        });

    } catch (error) {
        return { error: error || "Error creating task." };
    }

    return new NextResponse(
        JSON.stringify({ success: "Task Api demo!" }),
        { status: 200 }
    );
}

