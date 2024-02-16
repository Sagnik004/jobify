import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

/* 
  Below is the disk storage option. Commenting it out as many hosting platforms does not
  allow disk storage in free tier. Hence, the in-memory buffer option will be used as 
  workaround solution. The disk storage code is left as it can be useful as well when 
  we have real production apps running with paid services and disk space is available.
*/
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads');
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     cb(null, fileName);
//   },
// });

// Using in-memory storage option...
const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();
export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
