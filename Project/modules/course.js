const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    courseCode: {
        type: String,
        required: 'Please Enter Course Code'
    },
    courseName: { type: String, required: 'Please Enter Your Name' },
    courseDepartment: { type: String, required: 'Please Enter Course Department' }
});
module.exports = mongoose.model('course', studentSchema);