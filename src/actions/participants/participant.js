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


