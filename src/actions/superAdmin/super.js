'use server'
import db from "@/lib/db"
import { UserRole } from "@prisma/client";

// Get all users that have a role of tutor or admin
export async function getAdminAndTutorUsers() {
    try {
        const users = await db.user.findMany({
            where: {
                OR: [
                    { role: UserRole.ADMIN },
                    { role: UserRole.TUTOR }
                ]
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                track: true,
            },
            orderBy: {
                userName: 'asc',
            },
        });

        return { success: users };
    } catch (error) {
        console.error('Error fetching admin and tutor users:', error);
        return { success: false, error: error.message || 'An error occurred while fetching users.' };
    }
}


// Get the first three users who are either tutors or admins
export async function getPartialAdminAndTutorUsers() {
    try {
        const users = await db.user.findMany({
            where: {
                OR: [
                    { role: UserRole.ADMIN },
                    { role: UserRole.TUTOR }
                ]
            },
            take: 3,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                track: true,
            },
            orderBy: {
                userName: 'asc',
            },
        });

        return { success: users };
    } catch (error) {
        console.error('Error fetching admin and tutor users:', error);
        return { success: false, error: error.message || 'An error occurred while fetching users.' };
    }
}

// This will return all users who are participants
export async function getAdminParticipants() {
    try {
        const users = await db.user.findMany({
            where: {
                role: UserRole.PARTICIPANT
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                track: true,
                points: true
            },
            orderBy: {
                userName: 'asc',
            },
        });

        return { success: users };
    } catch (error) {
        console.error('Error fetching admin and tutor users:', error);
        return { success: false, error: error.message || 'An error occurred while fetching users.' };
    }
}

// This will return first three users who are participants
export async function getPartialAdminParticipants() {
    try {
        const users = await db.user.findMany({
            where: {
                role: UserRole.PARTICIPANT
            },
            take: 3,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                track: true,
            },
            orderBy: {
                userName: 'asc',
            },
        });

        return { success: users };
    } catch (error) {
        console.error('Error fetching admin and tutor users:', error);
        return { success: false, error: error.message || 'An error occurred while fetching users.' };
    }
}

//   Get all tasks 
export const getAllAdminTasks = async () => {
    try {
        const allTasks = db.adminTask.findMany({})
        return {success: allTasks}
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}

//   Get first three tasks 
export const getPartialAdminTasks = async () => {
    try {
        const allTasks = db.adminTask.findMany({
            take: 3,
        })
        return {success: allTasks}
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}

//   Get leaderboard 
export const getAdminLeaderBoard = async () => {
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
  
      // if (track) {
      //   userQuery.where = { track };
      // }
  
      const users = await db.user.findMany(userQuery);
      return { success: users };
    } catch (error) {
      console.log(error);
      return { error: error.message || 'An error occurred while fetching the leaderboard.' };
    }
  };

  //   Get all tasks by a particular auithor
export const getAllUserAdminTasks = async (id) => {
    try {
        const allTasks = db.adminTask.findMany({
            where: { authorId: id }
        })
        return {success: allTasks}
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}

// Get user details and task info of participant for admin page
export const getUserDetailsAndTaskInfo = async (id) => {
    try {
      const user = await db.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          userName: true,
          track: true,
          points: true,
          taskScore: true,
          taskCompleted: true,
          role: true,
        },
      });
  
      if (!user) {
        return { error: "User not found" };
      }
  
      const tasksInUserTrack = await db.adminTask.findMany({
        where: { track: user.track },
        select: {
          id: true,
          taskGrade: true,
        },
      });
  
      const totalTasksInTrack = tasksInUserTrack.length;
      const totalTaskGrade = tasksInUserTrack.reduce((sum, task) => sum + (task.taskGrade || 0), 0);
  
      return {
        success: {
          user,
          totalTasksInTrack,
          totalTaskGrade,
        },
      };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while fetching user details and task information." };
    }
  };


  // Get user details and stats for admin page
  export const getTutotDetailsAndStats = async (userId) => {
    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          userName: true,
          track: true,
          points: true,
          taskScore: true,
          taskCompleted: true,
          role: true,
        },
      });
  
      if (!user) {
        return { error: "User not found" };
      }
  
      const usersInTrack = await db.user.count({
        where: { track: user.track },
      });
  
      const tasksCreated = await db.adminTask.count({
        where: { authorId: userId },
      });
  
      const submissionsGraded = await db.submission.count({
        where: { gradedById: userId },
      });
  
      return {
        success: {
          user,
          usersInTrack,
          tasksCreated,
          submissionsGraded,
        },
      };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while fetching user details and statistics." };
    }
  };