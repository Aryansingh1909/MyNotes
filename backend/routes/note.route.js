import express from "express";
import {verifyToken} from "../utils/verifyUser.js"
import { addNote ,deleteNote,editNote,getAllNotes, searchNote, updateNotePinned} from "../controller/noteController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./files";
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({
    storage: storage
});
router.post("/add",verifyToken,upload.single("file"),addNote)
router.post("/edit/:noteId",verifyToken,editNote)
router.get("/all",verifyToken,getAllNotes)
router.delete("/delete/:noteId",verifyToken,deleteNote)
router.put("/update-note-pinned/:noteId",verifyToken,updateNotePinned)
router.get("/search",verifyToken,searchNote)


export default router