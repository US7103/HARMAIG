const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


//mongoose.connect('mongodb://localhost:27017/harmaig', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/harmaig')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


const FeedbackSchema = new mongoose.Schema({
    customerName: String,
    phoneNo: String,
    emailId: String,
    jewellryImage: String,
    comments: String
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


app.post('/submit-feedback', upload.single('jewellryImage'), (req, res) => {
    const { customerName, phoneNo, emailId, comments } = req.body;
    const jewellryImage = req.file ? req.file.path : null;

    const newFeedback = new Feedback({
        customerName,
        phoneNo,
        emailId,
        jewellryImage,
        comments
    });

    newFeedback.save()
        .then(() => res.status(200).send('Feedback submitted successfully!'))
        .catch(err => res.status(500).send('Failed to submit feedback'));
});


app.get('/view-feedback', (req, res) => {
    Feedback.find()
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(500).send('Failed to retrieve feedback'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
