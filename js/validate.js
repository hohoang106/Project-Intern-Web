// Đối tượng 
function validator(options){
  function validate (inputElenment, rule){
    let errorMessage = rule.test(inputElenment.value);
    let errorElement = inputElenment.parentElement.querySelector(options.errorSelector);

    if(errorMessage){
      errorElement.innerHTML = errorMessage;
      inputElenment.parentElement.classList.add('invalid')
    }
    else{
      errorElement.innerHTML = '';
      inputElenment.parentElement.classList.remove('invalid')
    }
    return !errorMessage ;
  }

  //lấy element của form cần validate
  let formElement = document.querySelector(options.form);

  if (formElement){
    formElement.onsubmit = function (e){
      e.preventDefault();

      let isFormValid = true;
      // Lặp qua từng rule và validate
      options.rules.forEach(function (rule){
        let inputElenment = formElement.querySelector(rule.selector);
        let isValid = validate(inputElenment, rule);
        if (!isValid){
          isFormValid = false ;
        }
      });

      if (isFormValid){
        if(typeof options.onSubmit === 'function'){
          var enableInputs = formElement.querySelectorAll('[name]');
          var formValues = Array.from(enableInputs).reduce(function(values, input){
            values[input.name] = input.value;
            return values;
          }, {});
          options.onSubmit(formValues);
        }
      }

    }
  }


  // Xử lý các sự kiện
  if(formElement){
    options.rules.forEach(function (rule){
      let inputElenment = formElement.querySelector(rule.selector);

      //Xử lý mỗi khi người dùng blur
      if (inputElenment){
        inputElenment.onblur = function (){
          validate(inputElenment, rule);
        }

        //Xử lý mỗi khi người dùng nhập
        
        inputElenment.oninput = function (){
          let errorElement = inputElenment.parentElement.querySelector(options.errorSelector);

          errorElement.innerHTML = '';
        }
      }
    })

  }
}

// định nghĩa các rule
validator.isRequiredFullName = function (selector){
  return {
    selector: selector,
    test: function(val){
      let regexUser = /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/;
      return regexUser.test(val) ? undefined : "Vui lòng nhập trường này";
    }
  };
}
validator.isRequiredUserName = function (selector){
  return {
    selector: selector,
    test: function(val){
      let regexUser = /^[a-zA-Z0-9]+$/;
      return regexUser.test(val) ? undefined : "Vui lòng nhập chính xác trường này";
    }
  };
}
validator.isRequiredPhone = function (selector){
  return {
    selector: selector,
    test: function(val){
      let regexPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/;
      return regexPhone.test(val) ? undefined : "Vui lòng nhập đúng số điện thoại";
    }
  };
}
validator.isEmail = function (selector){
    return {
    selector: selector,
    test: function(val){
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regexEmail.test(val) ? undefined : "Trường này phải là email (ví dụ:abc@gmail.com.vn)"
    }
  };
}
validator.isAddress = function (selector){
  return {
  selector: selector,
  test: function(val){
    let regexAddress = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [a-zA-z]{2}/;
    return regexAddress.test(val) ? undefined : "Vui lòng nhập đúng địa chỉ (ví dụ: 12 Quang Trung, Da Nang)"
  }
};
}
validator.isPassword = function (selector){
  return {
  selector: selector,
  test: function(val){
    let regexPassword =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regexPassword.test(val) ? undefined : "Mật khẩu phải có ít nhất 1 chữ in hoa, in thường và 8 kí tự "
  }
};
}
validator.isConfirmed = function (selector, getConfirmVal){
  return {
  selector: selector,
  test: function(val){
    return val === getConfirmVal() ? undefined : "Mật khẩu nhập vào không khớp"
  }
};
}

validator.isDated = function (selector){
  return {
  selector: selector,
  test: function(val){
    let regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    return regexDate.test(val) ? undefined : "Nhập đúng định dạng DD-MM-YYYY"
  }
};
}
validator.isTitle = function (selector){
  return {
  selector: selector,
  test: function(val){
    let regexTitle = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    return regexTitle.test(val) ? undefined : "Vui lòng nhập đúng trường này(ví dụ: Tiêu đề)"
  }
};
}
validator.isRequired = function (selector){
  return {
  selector: selector,
  test: function(val){
    return val ? undefined : "Vui lòng chọn file"
  }
};
}
validator.isContent = function (selector){
  return {
  selector: selector,
  test: function(val){
    let regexContent = /^[a-zA-Z]{500}$/;
    return regexContent.test(val) ? undefined : "Vui lòng nhập ít nhất 500 ký tự"
  }
};
}