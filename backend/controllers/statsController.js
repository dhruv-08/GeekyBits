const Attempts=require("../models/attemptModel");
var mongoose = require('mongoose');

/**Here field can be
		-- "user" as String or id 
		-- "subitem" as String or id
		-- "problem" as String or id
		as String means /stats/count?field="user"&status="wrong"
		as String means /stats/count?field="problem"&status="correct"
		as id means /stats/count?field="5asd5as6asdax7s"&status="correct"
**/

exports.countAttempts=async (req,res,next)=>{
	try{
		console.log(req.query);
		const {field,status}=req.query;
		const unique="$"+field;

		const count=await Attempts.aggregate([
			{$match:{attemptResult:status}},
			{
				$group:{
					_id:unique,
					count:{$sum:1}
				}
			}
		])
		res.status(200).json({
			count:count
		})
	}
	catch(err){
		res.status(500).json({ status:'error',
            message:err.message,
            err:err
        })
	}
}


exports.getAttemptsAccuracy=async (req,res,next)=>{
	try{

		const count=await Attempts.aggregate([
			{$match:{user:mongoose.Types.ObjectId(req.user._id)}},
			{
				$group:{
					_id:"$attemptResult",
					count:{$sum:1}
				}
			}
		])
		res.status(200).json({
			count:count
		})
	}
	catch(err){
		res.status(500).json({ status:'error',
            message:err.message,
            err:err
        })
	}	
}