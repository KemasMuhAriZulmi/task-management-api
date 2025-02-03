// export class Task {
//   constructor({ id, title, description, dueDate, status }) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.status = status;
//   }
// }


export class Task {
  constructor({ id, title, description, dueDate, status }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.status = status;

    if (!['pending', 'in progress', 'completed'].includes(status)) {
      throw new Error('Invalid task status');
    }
  }
}