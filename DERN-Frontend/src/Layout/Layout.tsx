import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <header>
        <Sidebar />
      </header>
      <div className="flex flex-col flex-1 h-full overflow-auto bg-gradient-to-br from-[#1f2937] via-[#334155] to-[#64748b]">
        <main className="flex-1">
          <ToastContainer />
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </div>
  )
}

export default Layout