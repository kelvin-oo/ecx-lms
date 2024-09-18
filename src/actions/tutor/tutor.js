'use server'
import db from "@/lib/db"
import { UserRole, TaskStatus } from "@prisma/client";
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


  export const getSingleSubmission = async (id) => {
    try {
      const submission = await db.submission.findUnique({
        where: { id },
        include: {
          participant: {
            select: {
              lastName: true, 
              firstName: true
            },
          },
          task: {
            select: {
              title: true,
              taskGrade: true,
              noOfTasks: true
            },
          },
        },
      });
      return submission;
    } catch (error) {
      console.log(error);
      return { error: error || "An error occurred while fetching the submission." };
    }
  };

  export const gradeSubmission = async (body, id, taskGrade, status) => {
    // console.log("🚀 ~ gradeSubmission ~ taskGrade:", taskGrade)
    // console.log("🚀 ~ gradeSubmission ~ id:", id)
    // console.log("🚀 ~ gradeSubmission ~ body:", body)
    // console.log(comment, submissionId, taskGrade, submissionGrade)
    const session = await currentServerUser()
    const grade = parseInt(body.submissionGrade, 10);
    if(grade > taskGrade) {
      return {mathError: 'submission grade cannt be above task grade'};
    }
    if(status === TaskStatus.GRADED) {
      return {gradeError: 'submission already graded'};
    }
    try {
      // Update submission
      
      const updatedSubmission = await db.submission.update({
        where: { id: id },
        data: {
          comment: body.comment,
          submissionGrade: grade,
          status: TaskStatus.GRADED,
          gradedById: session.id // Assuming the TaskStatus enum has a 'GRADED' value
        },
      });
  
      // Update user
      const user = await db.user.findUnique({
        where: { id: updatedSubmission.participantId },
      });
      if (user) {
        await db.user.update({
          where: { id: user.id },
          data: {
            points: { increment: grade },
            taskCompleted: { increment: 1 },
          },
        });
      }
  
      return {success: updatedSubmission};
    } catch (error) {
      console.log(error);
      return { error: error || "An error occurred while grading the submission." };
    }
  };

  export const getUserSubmissions = async (userId) => {
    try {
      const submissions = await db.submission.findMany({
        where: {
          participantId: userId
        },
        include: {
          task: {
            select: {
              id: true,
              title: true,
              description: true,
              deadline: true,
              noOfTasks: true,
              taskGrade: true,
              track: true
            }
          }
        },
        orderBy: {
          submittedAt: 'desc'
        }
      });
  
      return { success: submissions };
    } catch (error) {
      console.error('Error in getUserSubmissions:', error);
      return { error: error.message || 'An error occurred while fetching the user submissions.' };
    }
  };

  export const getSingleSubmission2 = async (id) => {
    try {
      const submission = await db.submission.findMany({
        where: { participantId: id },
        include: {
          participant: {
            select: {
              lastName: true, 
              firstName: true
            },
          },
          task: {
            select: {
              title: true,
              taskGrade: true,
              noOfTasks: true
            },
          },
        },
      });
      return submission;
    } catch (error) {
      console.log(error);
      return { error: error || "An error occurred while fetching the submission." };
    }
  };