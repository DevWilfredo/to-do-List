import { Check, X, SquarePen } from "lucide-react";
import TodoItemButtonComponent from "./TodoItemButtonComponent";

const itemButtons = [
  { icon: Check, size: 28 },
  { icon: X, size: 28 },
  { icon: SquarePen, size: 28 },
];

const TodoItemComponent = ({
  title,
  date,
  status,
  deleteTask,
  completeTask,
  isDeleting
}) => {
  return (
    <div
      className={`flex w-full border border-white rounded-3xl p-2 bg-sky-200 text-blue-900 shadow-cyan-800 shadow-xl hover:scale-110 transition-all cursor-pointer 
        ${isDeleting ? "animate-zoom-out" : "animate-zoom-in"}
      `}
    >
      {/* Columna izquierda: Título y Status */}
      <div className="flex flex-col justify-center w-full gap-4 pl-2">
        {/* Título */}
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

      {/* Columna derecha: Botones */}
      <div className="flex flex-col justify-between items-center ml-4 border-l h-full">
        {/* Botón check */}
        {/* {itemButtons.map((item,index)=>(
          <TodoItemButtonComponent key={index} ButtonIcon={item.icon} iconSize={item.size}/>
        ))} */}

        <button
          onClick={() => completeTask(title)}
          className="border-b border-white w-full px-2 py-1 flex justify-center items-center hover:bg-white/80 cursor-pointer"
        >
          <Check size={28} />
        </button>

        {/* Botón X */}
        <button
          onClick={() => deleteTask(title)}
          className="border-y border-white w-full px-2 py-1 flex justify-center items-center hover:bg-white/80 cursor-pointer"
        >
          <X size={28} />
        </button>

        {/* Botón editar */}
        <button className="border-t border-white w-full px-2 py-1 flex justify-center items-center hover:bg-white/80 cursor-pointer">
          <SquarePen size={28} />
        </button>
      </div>
    </div>
  );
};

export default TodoItemComponent;
