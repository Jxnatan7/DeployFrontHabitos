// import Habit from "./components/Habits"
import {Header} from "./components/Header";
import "./lib/dayjs"
import { SummaryTable } from "./components/SummaryTable";
import "./index.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // O estilo do Toastify
import api from "./lib/axios";

navigator.serviceWorker.register("service-worker.js")
  .then(async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription()

    if(!subscription) {
      const publicKeyResponse = await api.get("/push/public_key")

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey
      })
    }

    await api.post("/push/register", {
      subscription
    })

    await api.post("/push/send", {
      subscription
    })
  })

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header/>
        <SummaryTable/>
        <ToastContainer autoClose={3000}/>
      </div>
    </div>
  )
}
