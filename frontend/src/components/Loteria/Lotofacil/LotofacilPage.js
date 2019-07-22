import React, { useState, useEffect } from "react";
import jogosStore from "../../stores/jogosStore";
import statisticsStore from "../../stores/statisticsStore";
import { loadStatistics } from "../../../actions/statisticsActions";
import LotofacilList from "./LotofacilList";
import Paginator from "../../_common/Paginator";
function LotofacilPage() {
  const LOTERIA = "lotofacil";
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState({
    inicio: 0,
    currentPage: 0
  });
  const [jogos, setJogos] = useState(
    jogosStore.getJogos(currentPage.inicio, pageSize)
  );
  const [statistics, setStatistics] = useState(
    statisticsStore.getStatistics(LOTERIA)
  );
  useEffect(() => {
    function onStatisticsChange() {
      setStatistics(statisticsStore.getStatistics(LOTERIA));
    }

    function onJogosChange() {
      setJogos(jogosStore.getJogos(currentPage.inicio, pageSize));
    }
    if (jogos.length === 0) {
      jogosStore.loadJogos(currentPage.inicio, pageSize);
    }
    jogosStore.addChangeListener(onJogosChange);
    statisticsStore.addChangeListener(onStatisticsChange);
    if (!statisticsStore.getStatistics(LOTERIA)) {
      loadStatistics(LOTERIA);
      onStatisticsChange();
    }
    return () => {
      statisticsStore.removeChangeListener(onStatisticsChange);
      jogosStore.removeChangeListener(onJogosChange);
    };
  }, [currentPage.inicio, jogos.length]);

  function onPageChange(page) {
    const initialRecord = page * pageSize + 1;
    var newPage = {
      inicio: initialRecord,
      currentPage: page
    };
    setCurrentPage(newPage);
    debugger;
    setJogos(jogosStore.getJogos(currentPage.inicio, pageSize));
  }

  function handlePageChange(page) {
    onPageChange(page);
  }

  return (
    <div>
      <h1>Lotofácil</h1>
      <p>
        Loteria em que se escolhe entre 15 a 20 números e se sorteia 15 números.
      </p>
      <hr />
      {statistics && (
        <>
          <p>
            Primeiro jogo: {statistics.primeiroJogo}, Ultimo jogo:{" "}
            {statistics.ultimoJogo} - ({statistics.qtde})
          </p>
          <div>
            <Paginator
              recordCount={statistics.qtde}
              pageSize={pageSize}
              currentPage={currentPage.currentPage}
              setPage={handlePageChange}
            />
          </div>
          <hr />
        </>
      )}
      <h3>Lista dos Jogos</h3>
      <LotofacilList jogos={jogos} />
    </div>
  );
}
export default LotofacilPage;
