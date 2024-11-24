
import { z } from "zod";

export const resumeSchema = z.object({
    name: z.string().describe("نام").min(4, { message: "نام باید حداقل ۴ کاراکتر باشد" }),
    birthday: z.string({ message: "تاریخ تولد الزامی است" }).describe("تاریخ تولد"),
    tell: z.string().describe("تلفن").min(11, { message: "شماره تلفن الزامی است" }),
    email: z.string().email({ message: "ایمیل وارد شده معتبر نیست" }).describe("ایمیل"),
    sex: z.enum(["male", "female"], { errorMap: () => ({ message: "جنسیت باید انتخاب شود" }) }).describe("جنسیت"),
    conscriptionStatus: z.enum([
        "completed",
        "student",
        "in-progress",
        "conscript",
        "permanent-exemption"
    ], { errorMap: () => ({ message: "وضعیت نظام وظیفه باید انتخاب شود" }) }).describe("وضعیت نظام وظیفه"),
    resume: z.object({
        name: z.string(),
        size: z.number().max(2 * 1024 * 1024, { message: "حجم فایل باید کمتر از ۲ مگابایت باشد" }),
        type: z.literal("image/jpeg").or(z.literal("image/png")),
    }).describe("فایل رزومه").nullable()
});



export type ResumeType = z.infer<typeof resumeSchema>;

