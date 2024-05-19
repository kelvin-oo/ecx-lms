import * as z from "zod";


const TaskSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  deadline: z.string().min(1, {
    message: "deadline is required",
  }),
  noOfTasks: z.number().min(1, {
    message: "Number of tasks is required",
  }),
});

export default TaskSchema;