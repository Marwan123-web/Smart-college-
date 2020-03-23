let express = require('express');
let router = express.Router();
let studentService = require('../services/student');
let studentModel = require('../modules/student');
// const tokenMangement = require('../helper/tokenManagement');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");


/**
 * @method - GET
 * @description - Get All Students
 * @param - /student/
 */
router.get('/', (req, res) => {
    studentService.getAllStudents().then((students) => {
        if (students) {
            res.json(students);
        }
        else {
            res.status(404).json({ msg: 'Students Not Found' });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    })
});

/**
 * @method - GET
 * @description - Get Student By Id
 * @param - /student/getstudent
 */
router.get('/getstudent', (req, res) => {
    let id = req.body._id;
    studentService.getStudentById2(id).then((student) => {
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ msg: 'Student Not Found' });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});

/**
 * @method - PUT
 * @description - Update Student By Id
 * @param - /student/updatestudent
 */
router.put('/updatestudent', (req, res) => {
    let id = req.body._id;
    studentModel.findOneAndUpdate({ _id:id },
        req.body,
        { useFindAndModify: false },
        (err) => {
            if (err) {
                res.status(404).json({ msg: "Can't Update this Student Information" });
            }
            res.status(201).json({ msg: "Student's Information Updated Successfuly" });
        });
});

/**
 * @method - DELETE
 * @description - Delete Student By Id
 * @param - /student/deletestudent
 */
router.delete('/deletestudent', (req, res) => {
    let id = req.body._id;
    studentService.deleteStudent(id).then((student) => {
        if (student) {
            res.status(201).json({ msg: 'Student Deleted Successfuly' });
        }
        else {
            res.status(404).json({ msg: "Student Not Found" });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    });
});

/**
 * @method - POST
 * @description - Add New Student
 * @param - /student/addstudent
 */
router.post(
    "/addstudent",
    [
        check("_id", "Please Enter a Valid ID")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 8
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const student = req.body;
        email = student.email;
        id = req.body._id;
        try {
            let user = await studentModel.findOne({
                _id: id
            });
            let user2 = await studentModel.findOne({
                email
            });
            if (user || user2) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            else {
                studentService.addStudent(student);
                const payload = {
                    user: {
                        id: req.body._id
                    }
                };

                jwt.sign(
                    payload,
                    "randomString", {
                    expiresIn: 10000
                },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            token
                        });
                    }
                );
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

/**
 * @method - POST
 * @description - LoggedIn Student
 * @param - /student/login
 */
router.post(
    "/login",
    [
        check("_id", "Please enter a valid ID").isNumeric(),
        check("password", "Please enter a valid password").isLength({
            min: 8
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        // const { id, password } = req.body;
        id = req.body._id;
        password = req.body.password;
        try {
            let user = await studentModel.findOne({
                _id: id
            });
            // let user2 = await studentModel.findOne({
            //     password
            // });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: req.body._id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

/**
 * @method - GET
 * @description - Get LoggedIn Student
 * @param - /student/me
 */
router.get("/login/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await studentModel.findById(req.body._id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });


router.get('/logout/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "Internal Server Error" });
        }
        else {
            res.json({ msg: "User Loggedout Successfuly" });
        }
    });
});
module.exports = router;