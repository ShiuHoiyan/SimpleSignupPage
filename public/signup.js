$(function(){
  $('input:not(.button)').blur(function(){
    var self = this;
    if (validator.isFieldValid(this.id, $(this).val())) {
      $(this).parent().find('.error').text(validator.form[this.id].errorMessage).hide();
    } else {
      $(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
    }
  });

  $('input.button').click(function(){
    if (this.type == 'submit') $('input:not(.button)').blur();
    if (!validator.isFormValid() && this.type == 'submit') return false;
  });

  $("#register-form").submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url:"/regist",
      data: $('#register-form').serialize(),
      error: function(request) {
        console.log("");
      },
      success: function(data) {
        if (data == "注册成功") {
          window.location.href = '/';
        } else {
          $("#error").html(data);
        }
      }
    });
  });

});