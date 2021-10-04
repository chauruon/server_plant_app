const User = require('../models/User_model');
exports.signup = (req,res) => {
    const user = new User(req.body)
    user.save((err, user)=>{
        if(err){
            return res.status(400).json({
                error: "Đăng ký không thành công, vui lòng kiểm tra tài khoản hoặc mật khậu!",
                message: err.message
            })
        }

        res.json({
            message:"Success",
            user
        })
    });
}