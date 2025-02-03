import { MySQLTaskRepository } from '../infrastructure/database/mysql.task.repository.js';
import { TaskService } from '../core/application/task.service.js';


const taskRepository = new MySQLTaskRepository();
const taskService = new TaskService(taskRepository);

export const dependencies = {
  taskService
};