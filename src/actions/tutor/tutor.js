import db from "@/lib/db"
import { UserRole } from "@prisma/client";
import { currentServerUser } from "@/lib/serverAuthState";
// import { startOfDay, endOfDay } from 'date-fns';

export const getTrackParticipantCount = async () => {
    const user = await currentServerUser()
    try {
      const count = await db.user.count({
        where: { track: user.track }
      });
      return { success: count };
    } catch (error) {
      console.error('Error in getTrackParticipantCount:', error);
      return { error: error.message || 'An error occurred while fetching the participant count.' };
    }
  };


  export const getUngradedSubmissionsCountByTrack = async () => {
    const user = await currentServerUser()
    try {
      const count = await db.submission.count({
        where: {
          AND: [
            { task: { track: user.track } },
            { status: { not: 'GRADED' } }
          ]
        }
      });
      return { success: count };
    } catch (error) {
      console.error('Error in getUngradedSubmissionsCountByTrack:', error);
      return { error: error.message || 'An error occurred while fetching the ungraded submissions count.' };
    }
  };

//   export const getSubmissionsGradedOnDateByTrack = async () => {
//     const user = await currentServerUser()
//     const today = new Date();
//     const startOfDay = startOf(today, 'day');
//     const endOfDay = endOf(today, 'day');
//     try {
//       const submissions = await db.submission.findMany({
//         where: {
//           AND: [
//             { task: { track: user.track } },
//             { status: 'GRADED' },
//             { submittedAt: { gte: startOfDay, lte: endOfDay } }
//           ]
//         }
//       });
//       return { success: submissions };
//     } catch (error) {
//       console.error('Error in getSubmissionsGradedOnDateByTrack:', error);
//       return { error: error.message || 'An error occurred while fetching the graded submissions.' };
//     }
//   };

  export const getUserWithHighestPoints = async () => {
    try {
      const user = await db.user.findFirst({
        orderBy: {
          points: 'desc'
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          points: true
        }
      });
      return { success: user };
    } catch (error) {
      console.error('Error in getUserWithHighestPoints:', error);
      return { error: error.message || 'An error occurred while fetching the user with the highest points.' };
    }
  };

  export const getUserWithHighestTaskCompleted = async () => {
    try {
      const user = await db.user.findFirst({
        orderBy: {
          taskCompleted: 'desc'
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          taskCompleted: true
        }
      });
      return { success: user };
    } catch (error) {
      console.error('Error in getUserWithHighestTaskCompleted:', error);
      return { error: error.message || 'An error occurred while fetching the user with the highest task completed.' };
    }
  };
 

  export const getTrackSubmissions = async () => {
    const user = await currentServerUser()
    try {
      const submissions = await db.submission.findMany({
        where: {
          task: {
            track: user.track
          }
        },
        include: {
          participant: {
            select: {
              id: true,
              firstName: true,
              lastName: true
              // Add any other user fields you want to include
            }
          },
          task: {
            select: {
              id: true,
              deadline: true
              // Add any other task fields you want to include
            }
          }
        },
        orderBy: {
          submittedAt: 'desc'
        }
      });
  
      return { success: submissions };
    } catch (error) {
      console.error('Error in getTrackSubmissions:', error);
      return { error: error.message || 'An error occurred while fetching the track submissions.' };
    }
  };
