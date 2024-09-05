import db from "@/lib/db"
import { UserRole } from "@prisma/client";
import { currentServerUser } from "@/lib/serverAuthState";

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

export const getUserGradeSummary = async (userId, track) => {
  try {
    // 1. Fetch user's track
    
    // 2. Fetch total task grade for user's track and total submission grade for user
    const [taskGradeResult, submissionGradeResult] = await Promise.all([
      db.adminTask.aggregate({
        _sum: {
          taskGrade: true
        },
        where: {
          track: track
        }
      }),
      db.submission.aggregate({
        _sum: {
          submissionGrade: true
        },
        where: {
          participantId: userId
        }
      })
    ]);

    // 3. Return results
    return {success: {
      totalTaskGrade: taskGradeResult._sum.taskGrade || 0,
      totalSubmissionGrade: submissionGradeResult._sum.submissionGrade || 0
    }}
  } catch (error) {
    console.error('Error in getOptimizedUserGradeSummary:', error);
    throw new Error('Failed to fetch grade summary');
  }
}