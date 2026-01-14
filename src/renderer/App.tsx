import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function main() {
      console.log(await window.api.sayHello());
    }
    main();
  });
  return (
    <div>
      <h1>Hello World !</h1>
      <p style={{ marginTop: "20px", color: "#666" }}>Running on Electron</p>
    </div>
  );
}

export default App;
