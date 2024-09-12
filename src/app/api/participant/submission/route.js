
import { currentServerRole } from "@/lib/serverAuthState";
import { UserRole, TaskStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import TaskSchema from "@/schemas/task";
import db from "@/lib/db";
import { currentServerUser } from "@/lib/serverAuthState";


export async function POST(req) {
    const role = await currentServerRole();
    if (role !== UserRole.PARTICIPANT) {
        return new NextResponse(
            JSON.stringify({ error: "Not allowed" }),
            { status: 403 }
        );
    }

    const body = await req.json();
    const { submissionLink, taskId } = body;
    const user = await currentServerUser();

    try {
        // Fetch the task to check its deadline
        const task = await db.adminTask.findUnique({
            where: { id: taskId },
            select: { deadline: true }
        });

        if (!task) {
            return new NextResponse(
                JSON.stringify({ error: 'Task not found' }),
                { status: 404 }
            );
        }

        // Check if the deadline has passed
        if (task.deadline && new Date() > new Date(task.deadline)) {
            return new NextResponse(
                JSON.stringify({ error: 'Submission deadline has passed' }),
                { status: 400 }
            );
        }

        // Check if the user already has a submission for this task
        const existingSubmission = await db.submission.findFirst({
            where: {
                taskId: taskId,
                participantId: user.id
            }
        });

        if (existingSubmission) {
            if (existingSubmission.status === TaskStatus.GRADED) {
                return new NextResponse(
                    JSON.stringify({ error: 'This task has already been graded. No further submissions allowed.' }),
                    { status: 402 }
                );
            }
            // If the submission exists but is not graded, we'll update it instead of creating a new one
            const updatedSubmission = await db.submission.update({
                where: { id: existingSubmission.id },
                data: {
                    submissionLink,
                    status: TaskStatus.SUBMITTED
                }
            });

            return new NextResponse(
                JSON.stringify({ success: 'Submission updated successfully', submission: updatedSubmission }),
                { status: 200 }
            );
        }

        // If no existing submission, create a new one
        const newSubmission = await db.submission.create({
            data: {
                taskId,
                participantId: user.id,
                submissionLink,
                status: TaskStatus.SUBMITTED
            },
        });

        return new NextResponse(
            JSON.stringify({ success: 'Submission successful', submission: newSubmission }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: 'Error processing submission' }),
            { status: 500 }
        );
    }
}