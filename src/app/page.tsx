"use client";
import Button from "./components/button";
import DatePicker from "./components/date-picker";
import Dropzone from "./components/dropzone";
// import DatePicker from "react-multi-date-picker";
import Input from "./components/input";
import Select from "./components/select";

export default function Home() {
  return (
    <main className="p-8 bg-[#f1f3f3] flex flex-col gap-5">
      <Input
        onChange={({ currentTarget }) => {
          console.log(currentTarget.value);
        }}
        label="نام"
        error="این فیلد اجباری است"
      />
      <Button>ثبت</Button>

      <Select
        label="وضعیت نظام وظیفه"
        options={[
          { value: "0", label: "گزینه 1" },
          { value: "1", label: "گزینه 2" },
        ]}
        onChange={({ value, label }) => {
          console.log(value, label);
        }}
        initialValue="0"
        error="این فیلد اجباری است"
      ></Select>

      <DatePicker label="تاریخ تولد" />
      <Dropzone />
    </main>
  );
}
