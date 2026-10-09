import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    async function main() {
      setMessage(await window.api.sayHello());
    }
    main();
  });
  return (
    <div>
      <h1>{message}</h1>
      <p style={{ marginTop: "20px", color: "#666" }}>Running on Electron</p>
    </div>
  );
}

export default App;
