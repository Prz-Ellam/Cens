import multer from 'multer';
import path from 'path';
// import { fromBuffer } from 'file-type';

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: function (_req, file, cb) {
        const datetimestamp = Date.now();
        cb(
            null,
            file.fieldname +
                '-' +
                datetimestamp +
                '.' +
                file.originalname.split('.')[
                    file.originalname.split('.').length - 1
                ],
        );
    },
});

export const multerUpload = multer({
    storage,
    fileFilter: async function (_req, file, callback) {
        const ext = path.extname(file.originalname);
        const allowedExtension = ['.png', '.jpg', '.jpg'];
        if (!allowedExtension.includes(ext)) {
            callback(null, false);
            return;
        }
        // const buffer = file.buffer;
        // console.log(buffer);
        // const type = await fromBuffer(buffer);

        // if (!buffer) {
        //     return callback(null, false);
        // }
        callback(null, true);
    },
    limits: {
        fieldSize: 1024 * 1024,
    },
});
