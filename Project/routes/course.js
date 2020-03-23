let express = require('express');
let router = express.Router();
let courseService = require('../services/course');
router.get('/', (req, res) => {
    courseService.getAllCourses().then((courses) => {
        if (courses) {
            res.json(courses);
        }
        else {
            res.status(404).json({ msg: 'Courses Not Found' });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    })
});

router.get('/getcourse', (req, res) => {

    let id = req.body.courseCode;
    courseService.getCourseById(id).then((course) => {
        if (course) {
            res.json(course);
        }
        else {
            res.status(404).json({ msg: 'Course Not Found' });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});

router.post('/addcourse', (req, res) => {
    let course = req.body;
    courseService.addCourse(course).then((course) => {
        if (course) {
            res.status(201).json({ msg: 'Course Added Successfuly' });
        }
        else {
            res.status(404).json({ msg: "Can't Add this Course" });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});
router.put('/updatecourse', (req, res) => {
    let id = req.body.courseCode;
    courseService.getCourseById(id).then((course) => {
        if (course) {
            let newname = req.body.newcourseName;
            courseService.updateCourseName(newname).then((course) => {
                if (course) {
                    res.status(201).json({ msg: 'Course Updated Successfuly' });
                    res.json(contact);

                }
                else {
                    res.status(404).json({ msg: "Can't Update this Course" });
                    console.log(err);
                }
            });
        }
        else {
            res.status(404).json({ msg: 'Course Not Found' });
        }

    });
});

router.delete('/deletecourse', (req, res) => {
    let id = req.body.courseCode;
    courseService.deleteCourse(id).then((course) => {
        if (course) {
            res.status(201).json({ msg: 'Course Deleted Successfuly' });
        }
        else {
            res.status(404).json({ msg: "Can't Delete this Course" });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});


module.exports = router;