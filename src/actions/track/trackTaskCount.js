'use server'
import db from "@/lib/db"
export const countTrackTasks = async (track) => {
    try {
      const count = await db.adminTask.count({
        where: {track: track},
      })
      return count
    } catch (error) {
      console.log(error)
      return { error: error || "An error occurred while counting admin tasks." };
    }
  }