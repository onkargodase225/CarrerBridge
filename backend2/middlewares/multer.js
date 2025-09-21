// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in Express.js apps.


import multer from "multer";

const storage=multer.memoryStorage();
export const singleUpload=multer({storage}).single("file");
// jis jis route me image ya vidio upload hoga vahape multer middleware chhhaiye