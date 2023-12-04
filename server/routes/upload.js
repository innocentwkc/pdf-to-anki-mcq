import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get date in DD-MM-YYYY format
function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../data')); // Change this to the absolute path of your /data directory
    },
    filename: function (req, file, cb) {
        const filename  = req.body.filename  || `File-${getCurrentDate()}`;
        cb(null, filename  + path.extname(file.originalname)); // Use custom name with original file extension
    }
});

const upload = multer({ storage: storage });

// POST endpoint to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
	if (!req.file) {
			return res.status(400).send('No file uploaded.');
	}
    
    // return res.send(`File uploaded successfully as ${req.file.filename}`);
	return res.status(200).json({
		filename: req.file.filename,
		message: `File uploaded successfully as ${ req.file.filename }`
	});
			
});

export default router;
