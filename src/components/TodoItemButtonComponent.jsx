const TodoItemButtonComponent = ({ iconSize, ButtonIcon, }) => {
  return (
    <button className="border-b border-white w-full px-2 py-1 flex justify-center items-center hover:bg-white/80 cursor-pointer">
      <ButtonIcon size={iconSize} />
    </button>
  );
};

export default TodoItemButtonComponent;
