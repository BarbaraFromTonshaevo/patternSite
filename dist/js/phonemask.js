function maskInput(context) {
  let inputs = context.querySelectorAll('input[type="tel"]');
  if (inputs) {
    inputs.forEach(phone=>{
      let code = '+7',
      find = /\+7/;
      code = '+7';
      find = /\+7/;
      phone.addEventListener('focus', function () {
          phone.value = code + " " + phone.value.replace(code + ' ', '');
      });
      phone.addEventListener('input', function () {
          let val = phone.value.replace(find, ''),
          res = code + " ";
          val = val.replace(/[^0-9]/g, '');
          for (let i = 0; i < val.length; i++) {
              res += i === 0 ? ' (' : '';
              res += i == 3 ? ') ' : '';
              res += i == 6 || i == 8 ? '-' : '';
              if (i == 10) break;
                  res += val[i];
          };
          phone.value = res;
      });
      phone.addEventListener('blur', function () {
          let val = phone.value.replace(find, '');
          val = val.trim();
          if (!val) phone.value = null;
      });
    });
  }
}
maskInput(document);