import Quadra from "./modules/Quadra";
import Reserva from "./modules/Reserva";
import Usuario from "./modules/Usuario";
import prompt from "prompt-sync";
import Utils from "./utils";
import { quadrasMocked } from "./modules/Quadra/__mocks__/quadras";

const teclado = prompt();
class Main {
  constructor() {
    let quadras: Quadra[] = [];
    let reservas: Reserva[] = [];

    const dates = Utils.generateDatesArray(new Date());

    console.log("Bem vindo ao sistema de agendamento de quadras");

    const nomeUsuario = teclado("Seu Nome: ");
    const telefoneUsuario = teclado("Seu Telefone: ");

    quadrasMocked?.forEach((item) => {
      const quadra = new Quadra({
        nome: item.nome,
        esporte: item.esporte,
        horariosIndisponiveis: item.horariosIndisponiveis,
      });

      quadras.push(quadra);
    });

    const usuario: Usuario = new Usuario({
      nome: nomeUsuario,
      telefone: telefoneUsuario,
    });

    while (true) {
      console.log("0 - Sair");
      console.log("1 - Criar Quadra");
      console.log("2 - Agendar Horario");
      console.log("3 - Listar Quadras");
      console.log("4 - Listar Quadras Disponiveis");
      console.log("5 - Listar Reservas");

      const opcao = Number(teclado("Opção Desejada: "));

      if (opcao === 0) {
        break;
      }

      switch (opcao) {
        case 1:
          const nomeQuadra = teclado("Nome da Quadra: ");
          const modalidade = teclado("Modalidade: ");

          const quadra = new Quadra({
            nome: nomeQuadra,
            esporte: modalidade,
          });
          quadras.push(quadra);
          break;
        case 2:
          const quadraEscolhida = teclado("Nome da Quadra: ");

          const quadraEncontrada = quadras.find(
            (item) => item.nome === quadraEscolhida
          );

          if (!quadraEncontrada) {
            console.log("Está quadra não existe: ");
            break;
          }

          const dataHorario = teclado("Digite a data desejada (ex: 01/04): ");
          const horaHorario = teclado("Digite a hora desejada (ex: 16:00): ");
          const quantidadeDeTempo = 1;

          const horaFinal = horaHorario.split(":");

          const somarHora = Number(horaFinal[0]) + quantidadeDeTempo;

          const objetoHorario = {
            inicio: horaHorario,
            fim: `${somarHora}:00`,
            data: dataHorario,
          };

          const horario = `${objetoHorario.data}-${objetoHorario.inicio}-${objetoHorario.fim}`;

          if (!quadraEncontrada?.estaDisponivel(horario)) {
            console.log("Este Horario não está disponivel");
            break;
          }

          quadraEncontrada?.horariosIndisponiveis?.push(horario);

          const reserva = new Reserva({
            horario,
            nomeQuadra: quadraEscolhida,
            nomeUsuario: usuario.nome,
            quantidade: quantidadeDeTempo,
          });

          reservas.push(reserva);

          console.log("Esse horario foi agendado com sucesso");

          break;
        case 3:
          console.table(quadras);
          break;
        case 4:
          console.log("Quadras Disponiveis");
          const quadrasLivresComHorarios = quadras.map((item) => {
            const horariosLivres = dates.filter((date) =>
              item.estaDisponivel(date)
            );

            return {
              nome: item.nome,
              esporte: item.esporte,
              horariosLivres,
            };
          });

          console.table(quadrasLivresComHorarios);
          break;
        case 5:
          console.table(reservas);
          break;
        default:
          break;
      }
    }
  }
}

new Main();
