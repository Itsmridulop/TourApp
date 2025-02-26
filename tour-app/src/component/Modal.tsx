import { cloneElement, createContext, ReactNode, useContext, useState } from "react"
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiXMark } from "react-icons/hi2";

const modalContext = createContext<{
  openName: string;
  open: (name: string) => void;
  close: () => void;
} | undefined>(undefined)

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("")
  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <modalContext.Provider value={{ openName, open, close }}>
      {children}
    </modalContext.Provider>
  )
}

function Window({ children, name }: { children: ReactNode; name: string }) {
  const context = useContext(modalContext)
  if (!context) throw new Error('Window used outside of Modal')
  const { openName, close } = context
  const { ref } = useOutsideClick(close)

  if (name !== openName) return null

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white/10 backdrop-blur-sm z-[1000] transition-all duration-500 ">
      <div ref={ref} className="fixed top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-custom-lg z-[1000] rounded-lg">
        <button onClick={close} className="bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 absolute top-3 right-4 hover:bg-gray-100">
          <HiXMark />
        </button>
        {cloneElement(children as React.ReactElement, { onClose: close })}
      </div>
    </div>
  )
}

function Open({ children, opens: openWindowName }: { children: ReactNode; opens: string }) {
  const context = useContext(modalContext)
  if (!context) throw new Error('Open used outside of Modal')
  const { open } = context
  return cloneElement(children as React.ReactElement, { onClick: () => open(openWindowName) });
}

Modal.Window = Window
Modal.Open = Open

export default Modal