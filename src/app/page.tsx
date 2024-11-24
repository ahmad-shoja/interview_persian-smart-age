"use client";
import Button from "./components/button";
import Input from "./components/input";

export default function Home() {
  return (
    <main className="p-8 bg-[#f1f3f3]">
      <Input
        onChange={({ currentTarget }) => {
          console.log(currentTarget.value);
        }}
        label="نام"
        error="این فیلد اجباری است"
      />
      <Button >ثبت</Button>
    </main>
  );
}
