import { h } from "preact";
import { useState } from "preact/compat";

const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <div className="container">
      <p className="text">Counts: {count}</p>
      <button className="button" onClick={increment}>
        Increment
      </button>
      <button className="button" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export default App;
