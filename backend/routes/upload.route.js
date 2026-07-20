import express from 'express';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary'

const router = express.Router();

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '_' + file.originalname;
        cb(null, name)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }
    else {
        cb(new Error("Only image file!"), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}
})

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {folder: 'Batch13'})
        res.send({message: "Image uploaded", path: result.secure_url })  
    }
    catch(err){
        console.log(err)
        res.status(500).send({error: err.message})
    }
})

export default router;