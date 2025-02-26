import { createContext, ReactNode, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const alertContext = createContext<{
  showAlert: (message: string) => void;
  hideAlert: () => void;
} | undefined>(undefined);

function AlertProvider({ children }: { children: ReactNode }) {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => setAlertMessage(message);
  const hideAlert = () => setAlertMessage(null);

  return (
    <alertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alertMessage && <AlertBox message={alertMessage} onClose={hideAlert} />}
    </alertContext.Provider>
  );
}

function AlertBox({ message, onClose }: { message: string; onClose: () => void }) {
  const { ref } = useOutsideClick(onClose);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-200 text-black px-6 py-3 rounded shadow-lg flex items-center z-[100000]">
      <div ref={ref} className="flex items-center">
        <span className="mr-4">{message}</span>
        <button
          onClick={onClose}
          className="bg-green-400 text-white px-3 py-1 rounded transition duration-300 ease-in-out transform hover:scale-110 hover:bg-green-500"
        >
          <HiXMark />
        </button>
      </div>
    </div>
  );
}

function useAlert() {
  const context = useContext(alertContext);
  if (!context) throw new Error("useAlert must be used within an AlertProvider");
  return context;
}

export { AlertProvider, useAlert };
