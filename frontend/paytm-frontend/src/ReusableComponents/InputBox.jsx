import React from 'react';

export default function InputBox({ label ,onChange}) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900   text-left"
      >
        {label}
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={onChange}

required

      />
    </div>
  );
}
