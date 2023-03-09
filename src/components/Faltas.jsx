import axios from "axios";
import { useEffect, useState } from "react";

import { FaUserTie } from "react-icons/fa";

const Faltas = () => {
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDados() {
      try {
        const response = await axios.get(
          "https://political-api.vercel.app/presenca"
        );
        const deputados = response.data;
        const depap = deputados.filter((el) => {
            return el.estado === 'AP'
        })
        setDados(depap)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDados();
  }, []);

  return (
    <div>
      <div className="bg-sky-900/80 p-5">
        <h1 className="text-center text-white text-base font-bold">
          Quadro de faltas dos Deputados Federais do Amapá
        </h1>
      </div>
      <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
        {!isLoading && (
          <>
            {dados.map((dep) => {
              return (
                    <div className="bg-slate-200 p-3 border-2 rounded-lg border-slate-200 shadow-lg shadow-slate-500">
                        <div className="flex flex-col justify-center items-center mb-5">
                            <div className="rounded-full bg-slate-400 p-4 mb-3 shadow-lg shadow-slate-600">
                            <FaUserTie size="30" />
                            </div>
                            <h2 className="text-sm font-bold text-center">
                            {dep.deputado}
                            </h2>
                            <h2 className="text-xs">
                            {dep.partido}/{dep.estado}
                            </h2>
                        </div>

                        <div>
                            <h2 className="font-bold text-sm">Dados:</h2>
                            <p className="text-xs">Presença: {dep.presencas}</p>
                            <p className="text-xs">Ausencias justificadas: {dep.ausencias_justificadas}</p>
                            <p className="text-xs">Ausências não justificadas: {dep.ausencias_nao_justificadas}</p>
                        </div>

                    </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Faltas;
