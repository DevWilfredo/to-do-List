import { Check, SquarePen, X } from "lucide-react";
import TodoItemButtonComponent from "./TodoItemButtonComponent";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const TodoItemComponent = ({
  title,
  date,
  status,
  deleteTask,
  completeTask,
  isDeleting,
  updateFunction,
  taskId
}) => {
  const [hovered, isHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskStatus, setTaskStatus] = useState(status);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleTaskTitleChange = (title) => {
    setTaskTitle(title);
  };
  const handleTaskStatusChange = (status) => {
    setTaskStatus(status);
  };

  const handleSubmit = () => {
    updateFunction(taskTitle, taskStatus,taskId );
    setIsOpen(false);
  };

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
                status === false
                  ? "bg-yellow-400 text-yellow-800"
                  : status === true
                  ? "bg-green-400 text-green-800"
                  : "bg-gray-300 text-gray-800"
              }
            `}
            >
              {status === false ? "Pendiente" : "Completado"}
            </span>
            <p className="text-md font-mono uppercase tracking-widest">
              {date()}
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
          <button
            onClick={() => open()}
            className="border-b border-blue-800 w-full px-2 py-1 flex justify-center items-center hover:bg-blue-300/80 cursor-pointer"
          >
            <SquarePen size={28} />
          </button>
        </div>
      )}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 bg-gray-300/75">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gradient-to-r from-blue-500 to-teal-200 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-3xl font-medium text-white text-center"
              >
                Editar Tarea
              </DialogTitle>

              <div class="mb-5">
                <label
                  for="tastkTitle"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Titulo
                </label>
                <input
                  type="text"
                  id="tastkTitle"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  onChange={(e) => handleTaskTitleChange(e.target.value)}
                  value={taskTitle}
                />
              </div>
              <div class="mb-5">
                <label
                  for="taskStatus"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <select
                  onChange={(e) => handleTaskStatusChange(e.target.value)}
                  id="taskStatus"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected={taskStatus === true} value={true}>
                    Completado
                  </option>
                  <option selected={taskStatus === false} value={false}>
                    Pendiente
                  </option>
                </select>
              </div>
              <button
                onClick={() => handleSubmit()}
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Guardar
              </button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TodoItemComponent;
