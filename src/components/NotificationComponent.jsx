import { X } from "lucide-react";

const NotificationComponent = ({ message, onClose, animateOut }) => (
  <div
    className={`bg-green-500 text-white px-4 py-2 rounded shadow flex items-center gap-2
      animate-fade-in
      ${animateOut ? "animate-fade-out" : ""}
    `}
    style={{ minWidth: 200 }}
  >
    <span className="flex-1">{message}</span>
    <button
      className="ml-2 text-white font-bold"
      onClick={onClose}
      aria-label="Cerrar"
    >
      <X cursor='pointer'/>
    </button>
  </div>
);

export default NotificationComponent;
