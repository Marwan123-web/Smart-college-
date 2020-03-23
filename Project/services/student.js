const studentModel=require('../modules/student');

class studentService{
    static getAllStudents(){
        return studentModel.find();
    }
    // static getStudentById(id){
    //     return studentModel.findById(id);
    // }
    static getStudentById2(id){
        return studentModel.findOne({_id: id});
    }
    static getStudentByEmail(email){
        return studentModel.findOne({email: email});
    }
    static addStudent(student){
        let newStudent=new studentModel(student);
        return newStudent.save();
    }
    static updateStudent(id){
        return studentModel.findByIdAndUpdate(id);
    }
    static deleteStudent(id){
        return studentModel.findByIdAndDelete(id);
    }
};
module.exports=studentService;