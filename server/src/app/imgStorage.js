const multer = require('multer')
const fs = require('node:fs')
const path = require('path');
const Avatar = require('../DB_Connection/DAO/AvatarDAO');
const { PUBLIC, PUBLIC_IMAGES_DIR_NAME } = require('./constants');

const BYTES_BY_MB = 1000000
const FILE_SIZE_LIMIT = 10 * BYTES_BY_MB

const DIR = `${PUBLIC}/${PUBLIC_IMAGES_DIR_NAME}`

const multerUpload = multer({
    dest: DIR,
    limits: {
        fieldSize: FILE_SIZE_LIMIT
    }
})

const uploadFile = multerUpload.single('image')

function saveImage(file) {
    if (!file || typeof file.originalname !== 'string') return;

    const fileExtension = path.extname(file.originalname);
    const fileNameWithoutExtension = path.basename(file.originalname, fileExtension);
    const imageName = `${Date.now()}_${fileNameWithoutExtension}${fileExtension}`
    const newPath = `${DIR}/${imageName}`;

    fs.renameSync(file.path, newPath);

    const publicPath = `${PUBLIC_IMAGES_DIR_NAME}/${imageName}`
    return publicPath;
}

function getImage(path) {
    try {
        const image = fs.readFileSync(path);
        return image;
    } catch (error) {
        console.error('Error al leer la imagen:', error);
        return null;
    }
}


async function clearImageDir() {
    // Get all files in image dir
    const filesInDir = fs.readdirSync(DIR);

    // Get image refs in bd 
    const avatars = await Avatar.find({}, 'image').exec();

    const refFiles = avatars.map(avatar => avatar.image);

    // Find no ref files
    const noRefFiles = filesInDir.filter(
        file => {
            !refFiles.includes(file)
        }
    );

    //        console.log('ref', refFiles, 'noref', noRefFiles)

    // Delete no ref files
    noRefFiles.forEach(file => {
        const path = `${DIR}/${file}`;
        fs.unlinkSync(path);
        console.log(`deleted file: ${path}`);
    });
};

module.exports = { uploadFile, saveImage, getImage, clearImageDir }