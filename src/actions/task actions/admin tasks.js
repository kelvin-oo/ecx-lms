'use server'
import db from "@/lib/db"

export const getAllAdminTasks = async () => {
    try {
        const allTasks = db.adminTask.findMany({})
        return allTasks
        console.log(allTasks)
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}

export const getPartialAdminTasks = async (number, track) => {
    try {
        const allTasks = db.adminTask.findMany({
            where: {track: track},
            take: number
        })
        return allTasks
        console.log(allTasks)
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}


export const getTrackAdminTasks = async (track) => {
    try {
        const allTasks = db.adminTask.findMany({
            where: {track: track},
            orderBy: {
                deadline: 'desc', 
            },
        })
        
        return { success: allTasks };
    } catch (error) {
        console.log(error)
        return { error: error || "An error occurred during registration." };
    }
}


export async function getUserTaskAndStatuses(userId) {
  const currentDate = new Date();

  const tasks = await db.adminTask.findMany({
    include: {
      submissions: {
        where: {
          participantId: userId
        }
      }
    }
  });

  return tasks

//   return tasks.map(task => {
//     let status;
//     const submission = task.submissions[0];  // There should only be one submission per user per task

//     if (submission) {
//       if (submission.submissionGrade !== null) {
//         status = 'GRADED';
//       } else if (submission.submissionLink) {
//         status = 'SUBMITTED';
//       } else {
//         status = 'PENDING';
//       }
//     } else if (task.deadline && task.deadline < currentDate) {
//       status = 'EXPIRED';
//     } else {
//       status = 'PENDING';
//     }

//     return {
//       taskId: task.id,
//       title: task.title,
//       deadline: task.deadline,
//       status: status
//     };
//   });
}
export async function getUserSingleTaskAndStatuses(userId, taskId) {
  const currentDate = new Date();

  const task = await db.adminTask.findUnique({
    where: {
        id: taskId
      },
    include: {
      submissions: {
        where: {
          participantId: userId
        }
      }
    }
  });

  return task

//   return tasks.map(task => {
//     let status;
//     const submission = task.submissions[0];  // There should only be one submission per user per task

//     if (submission) {
//       if (submission.submissionGrade !== null) {
//         status = 'GRADED';
//       } else if (submission.submissionLink) {
//         status = 'SUBMITTED';
//       } else {
//         status = 'PENDING';
//       }
//     } else if (task.deadline && task.deadline < currentDate) {
//       status = 'EXPIRED';
//     } else {
//       status = 'PENDING';
//     }

//     return {
//       taskId: task.id,
//       title: task.title,
//       deadline: task.deadline,
//       status: status
//     };
//   });
}