import React, { useState, useEffect } from "react";
import jogosStore from "../../stores/jogosStore";
import { loadJogos } from "../../../actions/lotofacilActions";
import LotofacilList from "./LotofacilList";
function LotofacilPage() {
  const [jogos, setJogos] = useState(jogosStore.getJogos());

  useEffect(() => {
    jogosStore.addChangeListener(onChange);
    if (jogosStore.getJogos().length === 0) loadJogos();
    return () => jogosStore.removeChangeListener(onChange); // Clean up data
  }, []);

  function onChange() {
    setJogos(jogosStore.getJogos());
  }
  return (
    <div>
      <h1>Lotofácil</h1>
      <LotofacilList jogos={jogos} />
    </div>
  );
}
export default LotofacilPage;
