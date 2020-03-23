const courseModel=require('../modules/course');
class courseService{
    static getAllCourses(){
        return courseModel.find();
    }
    static getCourseById(id){
        return courseModel.findOne({courseCode:id})
    }
    static addCourse(course){
        let newCourse=new courseModel(course);
        return newCourse.save();
    }
    static updateCourseName(newname){
        return courseModel.findOneAndUpdate({courseName:newname});
    }
    static deleteCourse(id){
        return courseModel.findOneAndDelete({courseCode:id});
    }
};
module.exports=courseService;