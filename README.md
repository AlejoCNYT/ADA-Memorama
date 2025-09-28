# Memorama Ada · Cards Game (React + Hooks)
**README Internacional — Español / English**

Crea un juego tipo *memorama* usando **React** con los hooks `useState` y `useEffect`.  
Build a classic *memory matching* game in **React** using `useState` and `useEffect`.

---

## 🧠 Objetivo · Goal
- Generar pares de cartas (`generateCardPairs()`).
- Voltear cartas al hacer clic y mostrar su valor.
- Mantener un estado con **dos** cartas seleccionadas.
- Si coinciden: marcar `matched: true`. Si no, ocultarlas tras **500 ms**.
- Detectar victoria cuando **todas** estén emparejadas (alert).

---

## 📁 Estructura sugerida · Suggested structure
```
src/
  App.jsx
  utils/
    generateCardPairs.js
  styles.css (opcional)
```
`App.jsx` exporta **default** y **named**: `export default App; export { App };`

---

## 🧩 Requisitos · Requirements
- Node.js **18+** y npm
- Git
- (Opcional) URL de la plataforma Ada para pruebas automáticas

---

## 🚀 Inicio Rápido (Windows PowerShell) · Quick Start (Windows PowerShell)
> Ubícate en la carpeta donde tengas el proyecto.

```powershell
# Instalar dependencias
npm ci  # o: npm install

# Levantar el servidor de desarrollo (Vite)
npm run dev
# Copia la URL que imprime (ej. http://localhost:5173)
```

### Cliente de Ada (opcional si usas la plataforma)
```powershell
# Si el ejecutable está bloqueado, desbloquea una vez:
# Unblock-File .\ada-client.exe

# Guarda tu URL real de la asignación
$ADA_URL = "https://eci.learn.ada-school.org/cohorts/TU-LARGO-URL"

# Inicia sesión
.\ada-client.exe start $ADA_URL

# Correr pruebas de la asignación
npm run ada-test
```

---

## 🐧 macOS & Linux
```bash
# Instalar
npm ci  # o: npm install

# Dev server
npm run dev

# Cliente de Ada (si aplica)
./ada-client start "https://eci.learn.ada-school.org/cohorts/TU-LARGO-URL"   # macOS
./ada-client-linux start "https://eci.learn.ada-school.org/cohorts/TU-LARGO-URL"  # Linux

# Pruebas
npm run ada-test
```

---

## 🔧 Implementación · Implementation (resumen)
```jsx
// App.jsx (extracto guía)
import { useEffect, useState } from "react";
import { generateCardPairs } from "./utils/generateCardPairs";

function App() {
  const [cards, setCards] = useState(generateCardPairs());
  const [selectedCards, setSelectedCards] = useState([]); // indices

  const handleCardClick = (i) => {
    const c = cards[i];
    if (c.flipped || c.matched) return;
    if (selectedCards.length === 2) return;
    const copy = [...cards];
    copy[i] = { ...copy[i], flipped: true };
    setCards(copy);
    setSelectedCards((s) => [...s, i]);
  };

  useEffect(() => {
    if (selectedCards.length !== 2) return;
    const [a, b] = selectedCards;
    const copy = [...cards];
    if (copy[a].value === copy[b].value) {
      copy[a] = { ...copy[a], matched: true };
      copy[b] = { ...copy[b], matched: true };
      setCards(copy);
      setSelectedCards([]);
    } else {
      setTimeout(() => {
        const cpy = [...copy];
        cpy[a] = { ...cpy[a], flipped: false };
        cpy[b] = { ...cpy[b], flipped: false };
        setCards(cpy);
        setSelectedCards([]);
      }, 500);
    }
  }, [selectedCards, cards]);

  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      window.alert("¡Has ganado! / You won!");
    }
  }, [cards]);

  return (
    <div className="container-cards">
      {cards.map((card, idx) => (
        <button
          key={card.id ?? idx}
          className="card"
          onClick={() => handleCardClick(idx)}
          style={{ backgroundColor: (card.flipped || card.matched) ? "white" : "gray" }}
        >
          {(card.flipped || card.matched) ? String(card.value) : null}
        </button>
      ))}
    </div>
  );
}

export default App;
export { App };
```

---

## 🧪 Pruebas · Tests
```bash
npm run ada-test
```
Los tests verifican: 4 botones de carta, volteo al clic, esconder tras 500 ms si no hay match y permanencia si sí hay match.

---

## 🆘 Problemas comunes · Troubleshooting
- **`ReferenceError: cards is not defined`**: falta el estado `const [cards, setCards] = useState(generateCardPairs())`.
- **Snapshots fallan**: asegúrate de usar clases `container-cards` y `card`, y colores `gray/white` como en el test.
- **`dubious ownership` (Git)**: marca el repo como seguro  
  `git config --global --add safe.directory "C:/Users/usuario/Downloads/assignments-micro-course-hooks"`
- **SSH `Permission denied (publickey)`**: usa HTTPS + token o configura llave SSH.

---

## 📦 Scripts
- `npm run dev` — Vite dev server
- `npm run ada-test` — Ejecuta pruebas de la plataforma

---

## 📜 Licencia · License
Uso educativo. Adáptalo libremente para tus prácticas y proyectos.
