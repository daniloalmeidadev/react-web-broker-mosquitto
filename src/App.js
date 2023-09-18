import { Button, Grid } from "@mui/material";
import "./App.css";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import mqtt from "precompiled-mqtt";
import { useState } from "react";
import { STATE, TYPE_BUTTON, TOPIC, CON_MQTT } from "./utils/constants";

function App() {
  const [blueLed, setBlueLed] = useState(STATE.ON);
  const [blueLedVariant, setBlueLedVariant] = useState(TYPE_BUTTON.OUTLINED);

  const [greenLed, setGreenLed] = useState(STATE.ON);
  const [greenLedVariant, setGreenLedVariant] = useState(TYPE_BUTTON.OUTLINED);

  const [yellowLed, setYellowLed] = useState(STATE.ON);
  const [yellowLedVariant, setYellowLedVariant] = useState(
    TYPE_BUTTON.OUTLINED
  );

  const [redLed, setRedLed] = useState(STATE.ON);
  const [redLedVariant, setRedLedVariant] = useState(TYPE_BUTTON.OUTLINED);

  var options = {
    username: CON_MQTT.USERNAME,
    password: CON_MQTT.PASSWORD,
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  };

  const client = mqtt.connect(CON_MQTT.URL, options);

  // setup the callbacks
  client.on("connect", function () {
    console.log("Connected");
  });

  client.on("error", function (error) {
    console.log(error);
  });

  client.on("message", function (topic, message) {
    // called each time a message is received
    console.log("Received message:", topic, message.toString());
  });

  client.subscribe("inserir_topico_sensores");

  function lightUpBlueLed() {
    setBlueLed(blueLed === STATE.ON ? STATE.OFF : STATE.ON);
    setBlueLedVariant(
      blueLedVariant === TYPE_BUTTON.OUTLINED
        ? TYPE_BUTTON.CONTAINED
        : TYPE_BUTTON.OUTLINED
    );

    client.publish(TOPIC.BLUE_LED, blueLed);
  }

  function lightUpGreenLed() {
    setGreenLed(greenLed === STATE.ON ? STATE.OFF : STATE.ON);
    setGreenLedVariant(
      greenLedVariant === TYPE_BUTTON.OUTLINED
        ? TYPE_BUTTON.CONTAINED
        : TYPE_BUTTON.OUTLINED
    );

    client.publish(TOPIC.GREEN_LED, greenLed);
  }

  function lightUpYellowLed() {
    setYellowLed(yellowLed === STATE.ON ? STATE.OFF : STATE.ON);
    setYellowLedVariant(
      yellowLedVariant === TYPE_BUTTON.OUTLINED
        ? TYPE_BUTTON.CONTAINED
        : TYPE_BUTTON.OUTLINED
    );

    client.publish(TOPIC.YELLOW_LED, yellowLed);
  }

  function lightUpRedLed() {
    setRedLed(redLed === STATE.ON ? STATE.OFF : STATE.ON);
    setRedLedVariant(
      redLedVariant === TYPE_BUTTON.OUTLINED
        ? TYPE_BUTTON.CONTAINED
        : TYPE_BUTTON.OUTLINED
    );

    client.publish(TOPIC.RED_LED, redLed);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>Quarto de Danilo Almeida</div>

        <Grid container>
          <Grid sm={3} xs={12} sx={{ p: 4 }}>
            <Button
              fullWidth
              variant={blueLedVariant}
              color="primary"
              startIcon={<LightbulbIcon />}
              onClick={() => {
                lightUpBlueLed();
              }}
            >
              LED AZUL
            </Button>
          </Grid>
          <Grid sm={3} xs={12} sx={{ p: 4 }}>
            <Button
              fullWidth
              variant={greenLedVariant}
              color="success"
              startIcon={<LightbulbIcon />}
              onClick={() => {
                lightUpGreenLed();
              }}
            >
              LED VERDE
            </Button>
          </Grid>
          <Grid sm={3} xs={12} sx={{ p: 4 }}>
            <Button
              fullWidth
              variant={yellowLedVariant}
              color="warning"
              startIcon={<LightbulbIcon />}
              onClick={() => {
                lightUpYellowLed();
              }}
            >
              LED AMARELO
            </Button>
          </Grid>
          <Grid sm={3} xs={12} sx={{ p: 4 }}>
            <Button
              fullWidth
              variant={redLedVariant}
              color="error"
              startIcon={<LightbulbIcon />}
              onClick={() => {
                lightUpRedLed();
              }}
            >
              LED VERMELHO
            </Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
