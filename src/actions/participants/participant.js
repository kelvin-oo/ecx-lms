import db from "@/lib/db"
import { UserRole } from "@prisma/client";

export const getAllParticipants = async () => {
    try {
      const users = await db.user.findMany({
        where: { role: UserRole.PARTICIPANT },
      });
      return { success: users };
    } catch (error) {
      console.log(error);
      return { error: error.message || 'An error occurred while fetching participants.' };
    }
  };

  export const getPartialParticipants = async (number, track) => {
    try {
        const participants = db.user.findMany({
          where: {track: track},
            take: number
        })
        return participants
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}

export const getAllTrackParticipants = async (track) => {
  try {
    const participants = await db.user.findMany({
      where: {track: track},
    });
    return { success: participants };
  } catch (error) {
    console.log(error);
    return { error: error.message || 'An error occurred while fetching the leaderboard.' };
  }
};