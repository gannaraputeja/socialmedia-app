import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('public', 'images'))
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})

router.post('/', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json({message: 'File uploaded successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Issue ocurred while uploading image'})
    }
})

export default router
