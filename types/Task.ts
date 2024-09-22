export type Task = {
    _id: string;
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    dueDate?: Date;
    user: string;
  };
  