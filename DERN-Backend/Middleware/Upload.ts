import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';

// Configure storage engine
const storage: StorageEngine = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, './Storage'); // make sure this folder exists
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${file.fieldname}-${name}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
