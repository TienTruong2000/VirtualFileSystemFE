import './App.css';
import ErrorHandlerComponent from "./components/ErrorHandler/ErrorHandler";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <ErrorHandlerComponent>
      <MainPage/>
    </ErrorHandlerComponent>
  );
}

export default App;
