const gradeModel = require('../module/grade');
const studentModel = require('../module/student');
const courseModel = require('../module/course');
const attendanceModel = require('../module/attendance');
const teacherModel = require('../module/teacher')

class adminService {

    // ------------------------Student Services ----------------------------------------
    static getAllStudents() {
        return studentModel.find();
    }

    static getStudentById(id) {
        return studentModel.findOne({ _id: id });
    }

    static getStudentByName(studentName) {
        return studentModel.findOne({ name: studentName })
    }

    static addStudent(student) {
        let newStudent = new studentModel(student);
        return newStudent.save();
    }

    static updateStudent(id) {
        return studentModel.findByIdAndUpdate(id);
    }

    static deleteStudent(id) {
        return studentModel.findByIdAndDelete(id);
    }

    static getGradesForSpecificCourse(courseCode){
        return gradeModel.find({courseId:courseCode});
    }

    static updateGradesForSpecificCourse(courseCode){
        return gradeModel.findOneAndUpdate({courseId:courseCode});
    }



    // ------------------------Teacher Services ----------------------------------------
    static getAllTeachers() {
        return teacherModel.find();
    }

    static getTeacherById(id) {
        return teacherModel.findOne({ _id: id });
    }

    static getTeacherByName(teacherName) {
        return teacherModel.findOne({ name: teacherName })
    }

    static addTeacher(teacher) {
        let newTeacher = new teacherModel(teacher);
        return newTeacher.save();
    }

    static updateTeacher(id) {
        return teacherModel.findByIdAndUpdate(id);
    }

    static deleteTeacher(id) {
        return teacherModel.findByIdAndDelete(id);
    }



    // ----------------------- Course Services-----------------------------------------
    static getAllCourses() {
        return courseModel.find();
    }

    static getCourseByCode(code) {
        return courseModel.findOne({ courseCode: code })
    }

    static getCourseByName(courseName) {
        return courseModel.findOne({ courseName: courseName })
    }

    static addCourse(course) {
        let newCourse = new courseModel(course);
        return newCourse.save();
    }

    static updateCourse(code) {
        return courseModel.findOneAndUpdate({ courseCode: code });
    }

    static deleteCourse(code) {
        return courseModel.findOneAndUpdate({ courseCode: code });
    }


    static getStudentsInSpecificCourse(courseCode) {
        return studentModel.find({ courses: { $elemMatch: courseCode } })

    }
    static getTeacherInSpecificCourse(courseCode) {
        return teacherModel.find({ courses: { $elemMatch: courseCode } })

    }


    static deleteCourseForStudent(studentId, code) {
        return studentModel.findOne({ _id: studentId }).update(
            { courses: code }, // your query, usually match by _id
            { $pull: { courses: { $in: [code] } } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        )
    }

    static deleteCourseForTeacher(teacherId, code) {
        return teacherModel.findOne({ _id: teacherId }).update(
            { courses: code }, // your query, usually match by _id
            { $pull: { courses: { $in: [code] } } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        )
    }




}
module.exports = adminService;