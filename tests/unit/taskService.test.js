import { TaskService } from '../../src/core/application/taskService.js';
import { MySQLTaskRepository } from '../../src/infrastructure/database/mysqlTaskRepository.js';

describe('TaskService', () => {
  let taskService;
  let taskRepository;

  beforeEach(() => {
    taskRepository = new MySQLTaskRepository();
    taskService = new TaskService(taskRepository);
  });

  test('createTask should return a new task', async () => {
    const taskData = { title: 'Test Task', dueDate: '2023-12-31', status: 'pending' };
    const task = await taskService.createTask(taskData);
    expect(task.title).toBe('Test Task');
  });
});