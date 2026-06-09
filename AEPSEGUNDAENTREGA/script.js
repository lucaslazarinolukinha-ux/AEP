// Classe Sensor

class Sensor {

    constructor(id, consumo, tensao) {

        this.id = id;
        this.consumo = consumo;
        this.tensao = tensao;
    }
}

// Classe SmartGrid

class SmartGrid {

    constructor() {

        // Estrutura 1: FILA

        this.filaLeituras = [];

        // Estrutura 2: LISTA

        this.historicoAlertas = [];
    }

    adicionarLeitura(sensor) {

        this.filaLeituras.push(sensor);
    }

    processarLeitura() {

        if (this.filaLeituras.length === 0) {

            alert("Nenhuma leitura pendente.");
            return;
        }

        const sensor =
            this.filaLeituras.shift();

        let alerta = "";

        // Simulação da IA

        if (sensor.consumo > 90) {

            alerta =
            `⚠ Sensor ${sensor.id}:
            Sobrecarga Detectada`;
        }

        else if (sensor.tensao < 210) {

            alerta =
            `⚠ Sensor ${sensor.id}:
            Queda de Tensão`;
        }

        else {

            alerta =
            `✅ Sensor ${sensor.id}:
            Rede Operando Normalmente`;
        }

        this.historicoAlertas.push(alerta);
   
    }
     limparalertas(){
        this.historicoAlertas = [];
     }
}

const rede = new SmartGrid();

function registrarLeitura() {

    const id =
        document.getElementById("sensor").value;

    const consumo =
        Number(
            document.getElementById("consumo").value
        );

    const tensao =
        Number(
            document.getElementById("tensao").value
        );

    if (
        id === "" ||
        isNaN(consumo) ||
        isNaN(tensao)
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    const sensor = new Sensor(
        id,
        consumo,
        tensao
    );

    rede.adicionarLeitura(sensor);

    atualizarTela();

    limparCampos();
}

function processarLeitura() {

    rede.processarLeitura();

    atualizarTela();
}

function atualizarTela() {

    const fila =
        document.getElementById("fila");

    fila.innerHTML = "";

    rede.filaLeituras.forEach(sensor => {

        const li =
            document.createElement("li");

        li.textContent =
            `Sensor ${sensor.id}
             | Consumo: ${sensor.consumo}%
             | Tensão: ${sensor.tensao}V`;

        fila.appendChild(li);
    });

    const alertas =
        document.getElementById("alertas");

    alertas.innerHTML = "";

    rede.historicoAlertas.forEach(alerta => {

        const li =
            document.createElement("li");

        li.textContent = alerta;

        alertas.appendChild(li);
    });

    document.getElementById(
        "pendentes"
    ).textContent =
        rede.filaLeituras.length;

    document.getElementById(
        "totalAlertas"
    ).textContent =
        rede.historicoAlertas.length;
}

function limparCampos() {

    document.getElementById("sensor").value = "";
    document.getElementById("consumo").value = "";
    document.getElementById("tensao").value = "";
}

function limparalertas(){
    const confirmar = confirm("Tem certeza?");
    rede.limparalertas();
    atualizarTela();
}