import { useState, useRef, useEffect } from "react";
import InputComponent from "./components/InputComponent";
import TodoItemComponent from "./components/TodoItemComponent";
import NotificationComponent from "./components/NotificationComponent";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [animateOut, setAnimateOut] = useState(false);
  const timeoutRef = useRef(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const showNotification = (message) => {
    setAnimateOut(false);
    setNotification({ show: true, message });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => handleCloseNotification(), 5000);
  };

  const handleCloseNotification = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setNotification({ show: false, message: "" });
      setAnimateOut(false);
    }, 500);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const addTask = (title) => {
    const existingTask = tasks.find((element) => element.title === title);
    if (title === "") {
      showNotification("La tarea no puede estar vacia");
      return;
    } else if (!existingTask) {
      const newTask = {
        status: "Pendiente",
        date: getTodayDate(),
        title: title,
      };
      setTasks([...tasks, newTask]);
      return;
    }
    showNotification("La tarea ya existe");
  };

  const createTodo = (taskTitle) => {
    if (taskTitle === "") {
      showNotification("La tarea no puede estar vacia");
      return;
    }
    const newTask = {
      label: taskTitle,
      is_done: false,
    };
    fetch("https://playground.4geeks.com/todo/todos/wilfredoDev", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Will be true if the response is successful
        console.log(resp.status); // Status code 201, 300, 400, etc.
        return resp.json(); // Will attempt to parse the result to JSON and return a promise where you can use .then to continue the logic
      })

      .then((data) => {
        // This is where your code should start after the fetch is complete
        showNotification("Tarea eliminada correctamente");
        fetchTodos();
      })

      .catch((error) => {
        // Error handling
        console.log(error);
      });
  };

  const removeTask = (taskTitle) => {
    setDeletingTask(taskTitle);

    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.filter((item) => item.title !== taskTitle)
      );
      showNotification("Tarea eliminada correctamente");
      setDeletingTask(null);
    }, 500);
  };

  const completeTask = (task) => {
    const newTasks = [...tasks];
    const taskIndex = newTasks.findIndex((item) => task === item.title);
    newTasks[taskIndex].status = "Completado";
    setTasks(newTasks);
    showNotification("Tarea completada correctamente");
  };

  const createApiUser = () => {
    const options = { method: "POST" };
    fetch("https://playground.4geeks.com/todo/users/wilfredoDev", options)
      .then((response) => response)
      .finally((response) => fetchTodos());
  };

  const fetchTodos = () => {
    const options = { method: "GET" };
    fetch("https://playground.4geeks.com/todo/users/wilfredoDev", options)
      .then((response) => response.json())
      .then((response) => setTasks(response.todos))
      .catch((err) => console.error(err));
  };

  const deleteTodo = (task) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, options)
      .then((response) => {
        showNotification("Tarea eliminada correctamente");
        fetchTodos();
      })
      .catch((err) => console.error(err));
  };
  const updateTodo = (title,status,id) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: `{"label":"${title}","is_done":${status}}`,
    };

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        showNotification("Tarea Actualizada correctamente");
        fetchTodos();
      })
      .catch((err) => console.error(err));
  };
  const completeTodo = (task) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: `{"label":"${task.label}","is_done":true}`,
    };

    fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, options)
      .then((response) => response.json())
      .then((response) => {
        showNotification("Tarea completada correctamente");
        fetchTodos();
      })
      .catch((err) => console.error(err));
  };

  

  useEffect(() => {
    createApiUser()
  }, []);

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        {notification.show && (
          <NotificationComponent
            message={notification.message}
            onClose={handleCloseNotification}
            animateOut={animateOut}
          />
        )}
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-teal-200 min-h-screen text-white flex flex-col items-center ">
        <h1 className="text-4xl font-extrabold text-center mt-4 animate-fade-in">
          Todo List
        </h1>
        <div className="mt-4 animate-fade-in">
          <InputComponent addItem={createTodo} />
        </div>

        <div
          className="
    bg-blue-200
    w-[90%] max-w-4xl
    min-h-[300px]
    mt-6
    rounded-xl
    p-6
    text-black
    overflow-auto
    shadow-lg
    flex flex-col h-full
    animate-fade-in
    
  "
        >
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 flex-grow">
              {tasks.map((item, index) => (
                <TodoItemComponent
                  date={getTodayDate}
                  deleteTask={() => deleteTodo(item)}
                  status={item.is_done}
                  title={item.label}
                  key={item.id}
                  taskId={item.id}
                  completeTask={() => completeTodo(item)}
                  isDeleting={deletingTask === item.label}
                  updateFunction = {updateTodo}
                />
              ))}
            </div>
          ) : (
            <div className="text-center mt-10 text-blue-600 flex-grow">
              <h1 className="text-4xl font-extrabold text-center mt-4">
                No hay Tareas que Mostrar
              </h1>
            </div>
          )}

          <div className="mt-auto">
            <hr className="h-px my-8 border-0 bg-blue-700" />
            <div className="text-start text-blue-900 font-semibold">
              {tasks.filter((t) => t.status !== "Completado").length} tareas por
              completar
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
