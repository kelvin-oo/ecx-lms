import db from "@/lib/db";
export const getLeaderBoard = async (track) => {
    try {
      const userQuery = {
        orderBy: {
          points: 'desc',
        },
        select: {
          firstName: true,
          lastName: true,
          points: true,
          track: true,
        },
      };
  
      if (track) {
        userQuery.where = { track };
      }
  
      const users = await db.user.findMany(userQuery);
      return { success: users };
    } catch (error) {
      console.log(error);
      return { error: error.message || 'An error occurred while fetching the leaderboard.' };
    }
  };