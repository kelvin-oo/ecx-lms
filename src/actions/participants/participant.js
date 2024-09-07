'use server'
import db from "@/lib/db"
import { UserRole } from "@prisma/client";
import { currentServerUser } from "@/lib/serverAuthState";
import { revalidatePath } from "next/cache";
import { unstable_update } from "@/auth";
import bcrypt from "bcryptjs";

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

export const getParticipantProfile = async (userId) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    revalidatePath('/participant/profile')
    return { success: user };
  } catch (error) {
    console.log(error);
    return { error: error.message || 'An error occurred while fetching participants.' };
  }
};
export const editParticipantProfile = async (userId, updatedData) => {
  console.log(updatedData)
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: updatedData,
    });
    return { success: 'Profile updated successfully'};
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {error: error.message || 'An error occurred while updating the participant profile.' };
  }
};

export const updatePassword = async (body) => {
  try {
    const user = await currentServerUser()
    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    });

    if (!dbUser) {
      return { error: 'User not found' };
    }

    // Check if the old password matches
    const isOldPasswordValid = await bcrypt.compare(body.previousPassword, dbUser.password);

    if (!isOldPasswordValid) {
      return { error: 'Old password is incorrect' };
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(body.password, 10);

    // Update the user's password
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return { success: 'password updated successfully' };
  } catch (error) {
    console.log(error);
    return { error: error.message || 'An error occurred while updating the password.' };
  }
};
