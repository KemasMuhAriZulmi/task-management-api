import { TaskService } from '../../../core/application/taskService.js';
import { validateTaskInput } from '../../utils/validation/taskValidator.js';
import { GraphQLUpload } from 'graphql-upload';
import { AuthenticationError } from '../../utils/errors.js';



export const resolvers = (dependencies) => ({
  
  Task: {
    user: async ({ userId }, _, { dataSources }) => {
      return dataSources.userAPI.getUserById(userId);
    }
  },
  TaskInput: {
    dueDate: async ({ dueDate }) => {
      if (!dueDate) return null;
      const parsedDate = new Date(dueDate);
      if (isNaN(parsedDate.getTime())) {
        throw new ValidationError('Invalid date format');
      }
      return parsedDate;
    }
  },
  MutationResponse: {
    ok: ({ success }) => success,
    error: ({ error }) => error
  },
  Query: {
    getTasks: async (_, { filterByStatus, filterByDueDate }) => {
      return dependencies.taskService.getTasks({
        status: filterByStatus,
        dueDate: filterByDueDate
      });
    },
    getTaskDetail: async (_, { id }) => {
      return dependencies.taskService.getTaskById(id);
    }
  },
  Upload: GraphQLUpload, // GraphQL-Upload middleware for file uploads
  Mutation: {
    createTask: async (_, { input }) => {
      await validateTaskInput(input); // Validasi dengan Joi
      return dependencies.taskService.createTask(input);
    },
    updateTask: async (_, { id, input }) => {
      await validateTaskInput(input); // Validasi dengan Joi
      return dependencies.taskService.updateTask(id, input);
    },
    deleteTask: async (_, { id }) => {
      return dependencies.taskService.deleteTask(id);
    },
    uploadFile: async (_, { file }, context) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      const { createReadStream, filename } = await file;
      // const stream = createReadStream();
      // Upload file to your storage service
      // Save the file name and URL to your database or return it to the client
      // Example: await saveToStorage(stream, filename);
      // Example: const url = `http://storage.example.com/${filename}`;
      // Return the filename and URL to the client
      // Replace 'http://storage.example.com/${filename}' with your actual storage service URL
      return { filename, url: `./uploads${filename}` };
    }
  }
  
});

export const taskResolvers = (dependencies) => ({
  Query: {
    getTasks: async (_, { filterByStatus, filterByDueDate }, context) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      return dependencies.taskService.getTasks({
        status: filterByStatus,
        dueDate: filterByDueDate
      });
    },
    getTaskDetail: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      return dependencies.taskService.getTaskById(id);
    }
  },
  Mutation: {
    createTask: async (_, { input }, context) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      await validateTaskInput(input);
      return dependencies.taskService.createTask(input);
    }
  }
});