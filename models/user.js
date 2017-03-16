var mongoose = require("mongoose");  //  顶会议用户组件

module.exports = mongoose.model('User', {
    username: String,
    password: String,
    sid: String,
    phone: String,
    email: String
}); //  与users集合关联
