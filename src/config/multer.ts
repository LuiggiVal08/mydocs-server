import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

interface CustomFile extends Express.Multer.File {
    originalname: string;
    mimetype: string;
    size: number;
}

const storage: StorageEngine = multer.diskStorage({
    destination: (_req: Request, _file: CustomFile, cb): void => {
        cb(null, 'uploads/');
    },
    filename: (_req: Request, file: CustomFile, cb): void => {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
    },
});

const fileFilter = (_req: Request, file: CustomFile, cb: multer.FileFilterCallback): void => {
    const allowedTypes = /jpg|jpeg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
        return cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño de archivo: 10 MB
});

export { upload };
