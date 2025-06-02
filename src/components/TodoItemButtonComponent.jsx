const TodoItemButtonComponent = ({ iconSize, ButtonIcon, functionality, taskTitle}) => {
  return (
    <button onClick={functionality} className="border-b border-blue-800 w-full px-2 py-1 flex justify-center items-center hover:bg-blue-300/80 cursor-pointer">
      <ButtonIcon size={iconSize} />
    </button>
  );
};

export default TodoItemButtonComponent;
