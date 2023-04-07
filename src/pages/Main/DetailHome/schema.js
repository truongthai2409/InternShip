import * as yup from 'yup';

export const schema = yup.object({
  // cv: yup.required('* Bạn cần chọn CV')
  //   .mixed()
  //   .test("type", '* Chỉ hỗ trợ định dạng pdf', (value) => {
  //     if (value?.type) {
  //       return CV_FORMATS.includes(value?.type);
  //     } else {
  //       return true;
  //     }
  //   })
  //   .test("fileSize", '* Kích thước tối đa là 512Kb.', (value) => {
  //     if (value?.size) {
  //       return value?.size <= 512 * 1024;
  //     } else {
  //       return true;
  //     }
  //   })
  cv: yup
    .mixed()
    .test('required', '* You need to provide a file', (file) => {
      console.log(file);
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (file?.size > 0) return true;
      return false;
    })
    .test('fileSize', 'The file is too large', (file) => {
      console.log(file);
      //if u want to allow only certain file sizes
      return file && file.size <= 2000000;
    }),
});
