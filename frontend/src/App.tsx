import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AppRouter />
      </main>
    </div>
  );
}
