import express from "express";
import { posters, posterById, uploads, posterImage } from "../controllers/poster";
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });


router.get("/all", posters);
router.get("/:id", posterById);
router.post("/upload", upload.array("posters", 10), uploads);
router.get("/image/:key", posterImage);

export default router;
