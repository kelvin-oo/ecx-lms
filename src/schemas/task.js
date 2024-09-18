import * as z from "zod";


const TaskSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
  submissionDetails: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  deadline: z.date(),
  noOfTasks: z.number().min(1, {
    message: "Number of tasks is required",
  }),
});

export default TaskSchema;