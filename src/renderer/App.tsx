import { useEffect, useState } from "react";
import { MainLayout } from "./app/components/layout/MainLayout";
import { ThemeProvider } from "./app/context/ThemeProvider";

function App() {
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    async function main() {
      setMessage(await window.api.sayHello());
    }
    main();
  });
  return (
    <ThemeProvider>
      <MainLayout>
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="font-bold text-3xl">{message}</h1>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
