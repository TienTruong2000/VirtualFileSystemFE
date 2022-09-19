import './App.css';
import ErrorHandler from "./components/ErrorHandler/ErrorHandler.component";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <ErrorHandler>
      <MainPage/>
    </ErrorHandler>
  );
}

export default App;
