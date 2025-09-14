import { useState } from "react";
import "./App.css";

export default function App() {
  const [result, setResult] = useState("");
  const [a, seta] = useState("");
  const [b, setb] = useState("");
  const [c, setc] = useState("");
  const [d, setd] = useState("");
  const [knownSolution, setKnownSolution] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (a === "" || b === "" || c === "" || d === "" || knownSolution === "") {
      setResult("Preencha todos os campos.");
      return;
    }

    const aNum = Number(a);
    const bNum = Number(b);
    const cNum = Number(c);
    const dNum = Number(d);
    const kNum = Number(knownSolution);

    const { X2, X1, X0, resto } = ReducingToBhaskara(kNum, aNum, bNum, cNum, dNum);

    if (resto !== 0) {
      setResult(`A solução conhecida não é raiz. Resto: ${resto}`);
      return;
    }

    const solutions = Bhaskara(X2, X1, X0);

    setResult(`S = {${solutions.x1}; ${solutions.x2}; ${kNum}}`);
  }

  function handleReset() {
    seta("");
    setb("");
    setc("");
    setd("");
    setKnownSolution("");
    setResult("");
  }

  return (
    <>
      <div>
        <p>Calculadora por Briot-Ruffini</p>
        <p>As equações de 3º grau têm a forma: aX³ + bX² + cX + d = 0</p>
      </div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="inputs">
          <input
            className="numberInput"
            type="number"
            placeholder="a"
            value={a}
            onChange={(e) => seta(e.target.value)}
          />
          <input
            className="numberInput"
            type="number"
            placeholder="b"
            value={b}
            onChange={(e) => setb(e.target.value)}
          />
          <input
            className="numberInput"
            type="number"
            placeholder="c"
            value={c}
            onChange={(e) => setc(e.target.value)}
          />
          <input
            className="numberInput"
            type="number"
            placeholder="d"
            value={d}
            onChange={(e) => setd(e.target.value)}
          />
          <input
            className="numberInput"
            type="number"
            placeholder="Solução conhecida"
            value={knownSolution}
            onChange={(e) => setKnownSolution(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="submit">Calcular</button>
          <button type="reset">Limpar</button>
        </div>
      </form>

      {result && (
        <div>
          <p>{result}</p>
        </div>
      )}
    </>
  );
}

function ReducingToBhaskara(k, a, b, c, d) {
  const S1 = a;
  const S2 = b + k * S1;
  const S3 = c + k * S2;
  const resto = d + k * S3;
  return { X2: S1, X1: S2, X0: S3, resto };
}

function Bhaskara(a, b, c) {
  if (a === 0) {
    if (b === 0) return { x1: "Sem solução", x2: "Sem solução" };
    return { x1: -c / b, x2: "Não existe segunda raiz" };
  }

  const delta = b * b - 4 * a * c;
  if (delta < 0) return { x1: "Sem solução real", x2: "Sem solução real" };

  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);
  return { x1, x2 };
}
