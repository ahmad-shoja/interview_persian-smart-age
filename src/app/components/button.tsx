import React, { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type PropTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
};
export default function Button({
  disabled,
  destructive,
  children,
  ...props
}: PropTypes) {
  const classNames = clsx({
    "bg-gray-300 ": disabled,
    "border border-red-500 text-red-500 hover:bg-red-600 hover:text-white":
      !disabled && destructive,
    "bg-blue-800 hover:bg-blue-900": !disabled && !destructive,
    "text-white": !destructive,
    "font-medium py-2 px-4 rounded-md ": true,
  });
  return (
    <button className={`${classNames}`} {...props}>
      <p className="pt-1">{children}</p>
    </button>
  );
}
