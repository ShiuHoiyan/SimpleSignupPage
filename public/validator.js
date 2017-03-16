var validator = {
  form: {
    username: {
      status: false,
      errorMessage: '6~18位英文字母、数字或下划线，必须以英文字母开头'
    }, 
    sid: {
      status: false,
      errorMessage: '8位数字，不能以0开头'
    }, 
    password: {
      status: false,
      errorMessage: '密码为6~12位数字、大小写字母、中划线、下划线'
    },

    'repeatPassword': {
      status: false,
      errorMessage: '两次输入的密码不一致'
    },
    phone: {
      status: false,
      errorMessage: '11位数字，不能以0开头'
    }, 
    email: {
      status: false,
      errorMessage: '请输入合法邮箱'
    }
  }, 

  isUsernameValid: function (username){
    return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
  },

  isPasswordValid: function (password){
    return this.form.password.status = /^[a-zA-Z0-9_\-]{6,12}$/.test(password);
  },

  isRepeatPasswordValid: function (repeatPassword){
    return this.form['repeatPassword'].status = (repeatPassword == $("#password").val());
  },

  isSidValid: function (sid){
    return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
  },

  isPhoneValid: function (phone){
    return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
  },

  isEmailValid: function (email){
    return this.form.email.status = /^[a-zA-Z0-9_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
  },

  isFieldValid: function(fieldname, value){
    var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
    return this["is" + CapFiledname + 'Valid'](value);
  },

  isFormValid: function(){
    return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status 
    && this.form.password.status && this.form['repeatPassword'].status;
  },

  getErrorMessage: function(fieldname){
    return this.form[fieldname].errorMessage;
  },

}

if (typeof module == 'object') { // 服务端共享
  module.exports = validator
}


