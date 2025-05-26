import { useState } from "react";

const InputComponent = ({ addItem }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key == "Enter") {
      addItem(inputText);
      setInputText('')
    }
  };
  return (
    <input
      className="w-full max-w-96 bg-white placeholder:text-blue-800 text-blue-800 text-sm border border-blue-700 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-100 hover:border-slate-300 shadow-sm focus:shadow"
      placeholder="Escribe tu Tarea..."
      onChange={(e) => handleInputChange(e)}
      onKeyDown={handleEnterKey}
      value={inputText}
    />
  );
};

export default InputComponent;
