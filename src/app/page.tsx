"use client";
import Button from "./components/button";
import Input from "./components/input";
import { useFormik } from "formik";
import { Formik } from "./utils/types";
import { resumeSchema, ResumeType } from "@/schemas/resume-schema";
import { toFormikValidate } from "zod-formik-adapter";
import DatePicker from "./components/date-picker";
import Select from "./components/select";
import Dropzone from "./components/dropzone";
import axios from "axios";
export default function Home() {
  const postData = async (values: ResumeType) => {
    try {
      const response = await axios.post("/api/resume", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const formik: Formik<ResumeType> = useFormik<ResumeType>({
    initialValues: {
      name: "",
      birthday: "",
      tell: "",
      email: "",
      sex: "female",
      conscriptionStatus: "completed",
      resume: null,
    },
    validate: toFormikValidate(resumeSchema),
    onSubmit: postData,
  });

  return (
    <main className="p-8 bg-[#f1f3f3] flex flex-col gap-5" dir="rtl">
      <div className="flex justify-between border-b-2 pb-5 border-blue-800">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">فرم درخواست </h3>
          <p className="text-lg text-gray-500">ارسال رزومه برای شغل: تست </p>
        </div>
        <Button destructive className="!w-fit">
          لغو درخواست
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 ">
        <div className="flex w-full gap-5">
          <Input
            className="!w-1/2"
            label={resumeSchema.shape.name.description}
            onBlur={formik.handleBlur}
            onChange={(value) =>
              formik.setFieldValue("name", value.target.value)
            }
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Input
            type="number"
            className="!w-1/2"
            label={resumeSchema.shape.tell.description}
            onBlur={formik.handleBlur}
            onChange={(value) =>
              formik.setFieldValue("tell", value.target.value)
            }
            value={formik.values.tell}
            error={formik.errors.tell}
          />{" "}
        </div>
        <div className="flex w-full gap-5">
          <DatePicker
            className="!w-1/2"
            label={resumeSchema.shape.birthday.description}
            onBlur={formik.handleBlur}
            onChange={(value) => formik.setFieldValue("birthday", value)}
            value={formik.values.birthday}
            error={formik.errors.birthday}
          />
          <Input
            type="email"
            className="!w-1/2"
            label={resumeSchema.shape.email.description}
            onBlur={formik.handleBlur}
            onChange={(value) =>
              formik.setFieldValue("email", value.target.value)
            }
            value={formik.values.email}
            error={formik.errors.email}
          />{" "}
        </div>
        <div className="flex w-full gap-5">
          <Select
            className="!w-1/2"
            label={resumeSchema.shape.sex.description}
            options={[
              { label: "آقا", value: "male" },
              { label: "خانم", value: "female" },
            ]}
            onBlur={formik.handleBlur}
            onChange={(value) => formik.setFieldValue("sex", value)}
            value={formik.values.sex}
            error={formik.errors.sex}
          />

          <Select
            className="!w-1/2"
            label={resumeSchema.shape.conscriptionStatus.description}
            options={[
              { label: "انجام شده", value: "completed" },
              { label: "معافیت تحصیلی", value: "student" },
              { label: "در حال انجام", value: "in-progress" },
              { label: "مشمول", value: "conscript" },
              { label: "معاف دائم", value: "permanent-exemption" },
            ]}
            onBlur={formik.handleBlur}
            onChange={(value) => {
              console.log({ value });

              formik.setFieldValue("conscriptionStatus", value);
            }}
            value={formik.values.conscriptionStatus}
            error={formik.errors.conscriptionStatus}
          />
        </div>
        <Dropzone
          onFileSelect={(file) => formik.setFieldValue("resume", file)}
        />

        <p className="text-red-500 text-sm  font-medium">
          {Object.values(formik.errors).map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </p>
        <div className="flex justify-end ">
          <Button type="submit" className="!w-fit" disabled={!formik.isValid}>
            ثبت رزومه
          </Button>
        </div>
      </form>
    </main>
  );
}
