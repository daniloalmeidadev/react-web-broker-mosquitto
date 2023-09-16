import { Button } from "@mui/material";
import "./App.css";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Project</div>
        <Button
          variant="outlined"
          startIcon={<LightbulbIcon />}
          onClick={() => {
            acenderLuz();
          }}
        >
          Delete
        </Button>
      </header>
    </div>
  );
}

function acenderLuz() {
  console.log("teste teste");
}

export default App;
