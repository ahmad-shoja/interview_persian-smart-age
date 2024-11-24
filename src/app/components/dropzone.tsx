"use client";
import React, { useCallback, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

type PropTypes = {
  onFileSelect: (file: File) => void;
};

export default function Dropzone({ onFileSelect }: PropTypes) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop: DropzoneOptions["onDrop"] = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedFile(acceptedFiles[0]);
      onFileSelect(acceptedFiles[0]);
    },
    []
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="
      flex
      flex-col
      gap-2
      justify-center
      w-full
      
        "
    >
      <div
        {...getRootProps()}
        className="flex flex-col gap-5 items-center justify-center h-72
      bg-white
      rounded-md
        px-4
        border
        border-dashed
        border-gray-300
        cursor-pointer
        
        "
      >
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" />
          <path
            d="M21 16V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V18M21 16V4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V18M21 16L15.4829 12.3219C15.1843 12.1228 14.8019 12.099 14.4809 12.2595L3 18"
            stroke="#7777"
            stroke-linejoin="round"
          />
          <circle cx="8" cy="9" r="2" stroke="#7777" stroke-linejoin="round" />
        </svg>

        <p className="font-bold text-lg text-gray-600 cursor-pointer">
          <span className="text-blue-500 font-medium ">انتخاب فایل</span>
          <span> یا رها کردن فایل در این قسمت</span>
        </p>

        <input
          type="file"
          {...getInputProps()}
          id="input-file"
          className="border border-black hidden pointer-events-none"
        />
        <p className="text-gray-400 font-medium">
          یک فایل انتخاب کنید تا حداکثر 2MB{" "}
        </p>
      </div>
      {selectedFile && (
        <div className="flex px-2 py-2 h-16 bg-white border border-gray-400 rounded-md w-full justify-between items-center">
          <button
            className="appearance-none"
            onClick={() => setSelectedFile(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#7777"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <div className="flex gap-2 justify-end h-full ">
            <div className="flex flex-col items-end ">
              <p className="text-gray-700 font-medium">
                {selectedFile?.name || "single"}
              </p>
              <p className="text-gray-400 text-xs">
                {selectedFile
                  ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                  : ""}
              </p>
            </div>
            <div className="h-full  bg-gray-300 aspect-square rounded ">
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="thumbnail"
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
