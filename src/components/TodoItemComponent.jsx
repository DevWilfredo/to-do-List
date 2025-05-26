import { Check, X } from "lucide-react";
import TodoItemButtonComponent from "./TodoItemButtonComponent";
import { useState } from "react";

const TodoItemComponent = ({
  title,
  date,
  status,
  deleteTask,
  completeTask,
  isDeleting,
}) => {
  const [hovered, isHovered] = useState(false);

  const itemButtons = [
    { icon: Check, size: 28, functionality: completeTask },
    { icon: X, size: 28, functionality: deleteTask },
  ];
  return (
    <div
      onMouseEnter={() => isHovered(true)}
      onMouseLeave={() => isHovered(false)}
      className={`flex w-full border border-white rounded-3xl p-2 bg-sky-200 text-blue-900 shadow-cyan-800 shadow-xl hover:scale-110 transition-all cursor-pointer 
        ${isDeleting ? "animate-zoom-out" : "animate-zoom-in"}
      `}
    >
      <div className="flex flex-col justify-center w-full gap-4 pl-2">
        <div className="rounded-xl px-4 py-2">
          <h3 className="text-md font-mono uppercase tracking-widest">
            {title}
          </h3>
          <div className="rounded-xl mt-3">
            <span
              className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm
              ${
                status === "Pendiente"
                  ? "bg-yellow-400 text-yellow-800"
                  : status === "Completado"
                  ? "bg-green-400 text-green-800"
                  : "bg-gray-300 text-gray-800"
              }
            `}
            >
              {status}
            </span>
            <p className="text-md font-mono uppercase tracking-widest">
              {date}
            </p>
          </div>
        </div>
      </div>

      {hovered && (
        <div className="flex flex-col justify-around items-center ml-4 border-l h-full">
          {itemButtons.map((item, index) => (
            <TodoItemButtonComponent
              key={index}
              ButtonIcon={item.icon}
              iconSize={item.size}
              taskTitle={title}
              functionality={item.functionality}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItemComponent;
