import { Task } from '../domain/task.js';
import { NotFoundError, ValidationError } from '../../utils/errors.js';

export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(taskData) {
    const task = new Task(taskData);
    return this.taskRepository.create(task);
  }

  async getTasks(filters) {
    return this.taskRepository.findAll(filters);
  }

  async getTaskById(id) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new NotFoundError('Task not found');
    return task;
  }

  async updateTask(id, updatedTaskData) {
    const task = await this.getTaskById(id);
    Object.assign(task, updatedTaskData);
  }

  async deleteTask(id) {
    await this.getTaskById(id);
    return this.taskRepository.delete(id);
  }

}