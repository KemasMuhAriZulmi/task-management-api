import fs from 'fs';
import path from 'path';

export class LocalStorage {
  constructor(uploadPath = './uploads') {
    this.uploadPath = uploadPath;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
  }

  async upload(file) {
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    const filePath = path.join(this.uploadPath, filename);
    return new Promise((resolve, reject) => {
      stream
        .pipe(fs.createWriteStream(filePath))
        .on('finish', () => resolve({ filename, path: filePath }))
        .on('error', reject);
    });
  }
}