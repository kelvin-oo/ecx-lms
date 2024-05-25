export const getPartialLeaderBoard = async () => {
    try {
        const users = db.user.findMany({})
        return allTasks
        console.log(users)
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}