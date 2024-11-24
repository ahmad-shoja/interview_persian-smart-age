import { FormikValues, useFormik } from "formik";

export type Formik<T extends FormikValues> = ReturnType<typeof useFormik<T>>;
