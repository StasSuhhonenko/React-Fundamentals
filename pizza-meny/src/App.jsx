import pizzaData from "./data.js";

///// Simplest React Component
function App() {
  /// Never nest function declarations
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        <>
          <p>
            Authentic italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaDatObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : null}
    </main>
  );
}
function Pizza({ pizzaDatObj }) {
  return (
    <li className={`pizza ${pizzaDatObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaDatObj.photoName} alt={pizzaDatObj.name} />
      <div>
        <h3>{pizzaDatObj.name}</h3>
        <p>{pizzaDatObj.ingredients}</p>
        <span>
          {pizzaDatObj.soldOut
            ? "Sold out".toUpperCase()
            : pizzaDatObj.price + "$"}
        </span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        "Sorry, we're closed. Come back later!"
      )}
    </footer>
  );
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>We're open until {closeHour}:00. Come visit us or order online!</p>
      <button className="btn">Order</button>
    </div>
  );
}

export default App;
