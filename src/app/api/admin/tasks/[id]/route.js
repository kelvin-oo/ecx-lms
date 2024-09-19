import db from "@/lib/db";
import { NextResponse } from "next/server";
import { currentServerRole } from "@/lib/serverAuthState";
import TaskSchema from "@/schemas/task";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";



export async function GET(req, ctx) {
    const role = await currentServerRole()
    if (role !== UserRole.ADMIN) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 }
        );
    }

    const id = ctx.params.id

    try {
        const adminTask = db.adminTask.findUnique({ where: { id } });
        return new NextResponse(JSON.stringify(adminTask), { status: 200 })
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({
            message: "An error occurred while fetching task.",
            error,
        }), { status: 401 })
    }
}


export async function PATCH(req, ctx) {
    const role = await currentServerRole()
    if (role === UserRole.PARTICIPANT) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 }
        );
    }
    const body = await req.json()
    // console.log("🚀 ~ PATCH ~ body:", body)
    if (body.deadline) {
        const deadline = new Date(body.deadline);
        if (isNaN(deadline.getTime())) {
            return new NextResponse(
                JSON.stringify({ error: "Invalid deadline format. Please use ISO-8601." }),
                { status: 400 }
            );
        }
        body.deadline = deadline.toISOString(); // Convert to ISO-8601
        
    }

    
    
    

    
    // const result = TaskSchema.safeParse(body);

    // console.log(result);

    // if (!result.success) {
    //     return new NextResponse({ error: "Invalid fields!" })
    // }

    const id = ctx.params.id
    // console.log("🚀 ~ PATCH ~ id:", id)

    try {
        const updatedTask = await db.adminTask.update({
            where: { id: id },
            data: body
        });
        return new NextResponse(JSON.stringify(updatedTask), { status: 200 })
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({
            message: "An error occurred while updating this task.",
            error,
        }), { status: 401 })
    }
}


export async function DELETE(req, ctx) {
    const role = await currentServerRole()
    if (role === UserRole.PARTICIPANT) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 }
        );
    }

    const id = ctx.params.id
    // console.log("🚀 ~ DELETE ~ id:", id)
    try {
        await db.adminTask.delete({
            where: {
              id: id,
            },
          });
          revalidatePath('/tutor/all-tasks')
        return new NextResponse(JSON.stringify({
            message: "Successfully deleted task."
        }), { status: 200 })
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({
            message: "An error occurred while deleting this task.",
            error,
        }), { status: 400 })
    }
}
