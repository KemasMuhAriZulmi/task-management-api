// import { Task } from '../../core/domain/task.js';
// import connection from '../../config/db.js';

// export class MySQLTaskRepository {
//   async create(task) {
//     const [result] = await connection.execute(
//       'INSERT INTO tasks (title, description, dueDate, status) VALUES (?, ?, ?, ?)',
//       [task.title, task.description, task.dueDate, task.status]
//     );
//     return new Task({ ...task, id: result.insertId });
//   }

//   // Implementasi method lainnya
// }

import mysql from 'mysql2/promise';
import { Task } from '../../../core/domain/task.js';

export class MySQLTaskRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async create(task) {
    const [result] = await this.connection.execute(
      'INSERT INTO tasks (title, description, dueDate, status) VALUES (?, ?, ?, ?)',
      [task.title, task.description, task.dueDate, task.status]
    );
    return new Task({ ...task, id: result.insertId });
  }

  async findAll(filters = {}) {
    let query = 'SELECT * FROM tasks';
    const conditions = [];
    const params = [];

    if (filters.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }
    if (filters.dueDate) {
      conditions.push('dueDate = ?');
      params.push(filters.dueDate);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    const [rows] = await this.connection.execute(query, params);
    return rows.map(row => new Task(row));
  }

  async findById(id) {
    const [row] = await this.connection.execute('SELECT * FROM tasks WHERE id =?', [id]);
    return row? new Task(row) : null;
  }

  async update(id, updatedTask) {
    const [result] = await this.connection.execute(
      'UPDATE tasks SET title =?, description =?, dueDate =?, status =? WHERE id =?',
      [updatedTask.title, updatedTask.description, updatedTask.dueDate, updatedTask.status, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await this.connection.execute('DELETE FROM tasks WHERE id =?', [id]);
    return result.affectedRows > 0;
  }

}

// Example usage

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'task_management'
});