import db from "@/lib/db";
import { NextResponse } from "next/server";
import { currentServerRole } from "@/lib/serverAuthState";
import TaskSchema from "@/schemas/task";



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
        const task = db.findUnique({ where: { id } });
        return new NextResponse(JSON.stringify(task), { status: 200 })
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
    if (role !== UserRole.ADMIN) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 }
        );
    }
    const body = await req.json
    const result = TaskSchema.safeParse(body);

    console.log(result);

    if (!result.success) {
        return { error: "Invalid fields!" };
    }

    const id = ctx.params.id

    try {
        const updatedTask = await db.adminTasks.update({
            where: { id: id },
            data: {
                body,
            }
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
    if (role !== UserRole.ADMIN) {
        return new NextResponse(
            JSON.stringify({ error: "Not authorised!" }),
            { status: 403 }
        );
    }

    const id = ctx.params.id
    try {
        await db.adminTasks.delete({
            where: {
              id: id,
            },
          });
        return new NextResponse(JSON.stringify({
            message: "Successfully deleted task."
        }), { status: 200 })
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({
            message: "An error occurred while deleting this task.",
            error,
        }), { status: 500 })
    }
}
