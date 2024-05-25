import db from "@/lib/db"

export const getAllParticipants = async () => {
    try {
        const users = db.user.findMany({})
        return users
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}