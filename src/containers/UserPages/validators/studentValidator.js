import * as Yup from "yup";
// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default Yup.object().shape({
  // name: Yup.string()
  //     .min(2, 'Անունը պետք է լինի 2 նիշից ոչ պակաս')
  //     .max(50, 'Անունը պետք է լինի 50 նիշից ոչ ավել')
  //     .required('This field is required'),
  // surname: Yup.string()
  //     .min(2, 'Ազգանունը պետք է լինի 2 նիշից ոչ պակաս')
  //     .max(50, 'Ազգանունը պետք է լինի 50 նիշից ոչ ավել')
  //     .required('This field is required'),
  email: Yup.string()
    .email("Please enter a valid e-mail address")
    .required("This field is required"),
  old_password: Yup.string().required("Այս դաշտը պարտադիր է"),

  new_password: Yup.string()
    .required("Այս դաշտը պարտադիր է")
    .min(8, "Գաղտնաբառը պետք է լինի առնվազն 8 նիշ")
    .max(50, "Գաղտնաբառը պետք է լինի ոչ ավելի, քան 50 նիշ")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      "Գաղտնաբառը պետք է պարունակի մեծատառ, փոքրատառ և թվեր"
    ),
  password_confirmation: Yup.string()
    .required("Այս դաշտը պարտադիր է")
    .when("new_password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("new_password")],
        "Գաղտնաբառերը չեն համապատասխանում"
      ),
    }),
  // phone: Yup.string()
  //     .required('This field is required')
  //     .matches(phoneRegExp, 'Խնդրում ենք մուտքագրել ճիշտ հեռախոսահամար'),
});
