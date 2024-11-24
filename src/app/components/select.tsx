import React, { useState } from "react";

type OptionType = {
  value: string;
  label: string;
};
type PropsTypes = {
  options: OptionType[];
  label?: string;
  onChange?: (newValue: { value: string; label: string }) => void;
  initialValue?: string;
  error?: string;
};
export default function Select({
  options,
  onChange,
  label,
  error,
  initialValue,
  ...props
}: PropsTypes) {
  const inputId = React.useId();
  const [value, setValue] = useState(initialValue);

  const errorMarkup = (
    <div className="flex items-center ps-2 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#D16D6A"
      >
        <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
        <path
          d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 11.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
          opacity=".3"
        />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
      </svg>
      <span className="text-red-500 text-sm  font-medium">{error}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-1 w-full " dir="rtl">
      <div className="peer flex flex-col relative  py-3 px-4 rounded-md bg-white border border-[#e5e7e7] focus-within:border-[#514bbe] w-full">
        <input
          {...props}
          id={inputId}
          value={options.find((item) => item.value === value)?.label}
          readOnly
          className="
          peer
          w-full
          text-base
          pt-4
          focus:outline-none
          focus:appearance-none
          cursor-pointer
        "
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className="
          absolute
           z-10
           start-6
           top-0
           pt-2
           text-sm
           transition-all
           bg-white
           text-gray-500
           peer-focus:pt-2
           peer-focus:top-0
           peer-focus:text-sm
           peer-placeholder-shown:pt-0
           peer-placeholder-shown:top-[18px]
           peer-placeholder-shown:text-base
          "
        >
          {label}
        </label>
      </div>
      <div className="w-full mt-1 relative peer-focus-within:flex hidden transition-all">
        <div
          className="
          htmlFor={inputId}
          absolute
          w-full
          h-52
          rounded-md
          bg-white
          shadow-lg
          z-20
          "
        >
          <ul>
            {options.map(({ value, label }) => (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
                key={value}
                onMouseDown={() => {
                  setValue(value);
                  onChange?.({ value, label });
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && errorMarkup}
    </div>
  );
}