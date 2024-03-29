const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    courseTitle:String,
    courseItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CourseItem'        
    }],
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'        
    }]
},{timestamps:true});
module.exports=mongoose.model('Course',courseSchema);