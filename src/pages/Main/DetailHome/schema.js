import * as yup from 'yup';

export const schema = yup.object({
  cv: yup
    .mixed()
    .test('required', '* Vui lòng cập nhật CV', (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (file?.size > 0) return true;
      return false;
    })
    .test('fileSize', 'The file is too large', (file) => {
      //if u want to allow only certain file sizes
      return file && file.size <= 2000000;
    }),
});
