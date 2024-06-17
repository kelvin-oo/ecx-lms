'use server'
import db from "@/lib/db"

export const getAllAdminTasks = async () => {
    try {
        const allTasks = db.adminTask.findMany({})
        return allTasks
        console.log(allTasks)
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}

export const getPartialAdminTasks = async (number, track) => {
    try {
        const allTasks = db.adminTask.findMany({
            where: {track: track},
            take: number
        })
        return allTasks
        console.log(allTasks)
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}

