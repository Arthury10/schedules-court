import Usuario from "./modules/Usuario";
import { quadrasMocked } from "./modules/Quadra/__mocks__/quadras";
import IOService from "./modules/IoService";
import QuadraManager from "./modules/QuadraMananger";
import ReservaManager from "./modules/ReservaMananger";
import Utils from "./utils";
import Horario from "./modules/Horario";

class Main {
  private ioService = new IOService();
  private quadraManager = new QuadraManager(this.ioService, quadrasMocked);
  private reservaManager = new ReservaManager(this.ioService);
  private usuario: Usuario | undefined;
  private running = true;

  constructor() {
    // const date = Utils.generateDatesArray();
    // console.table(date.map((item) => item.toString()));
    // console.table(
    //   date.map((item) => {
    //     return {
    //       date: item.date,
    //       horaInicio: item.horaInicio,
    //       horaFim: item.horaFim,
    //       disponivel: item.isAvailable,
    //     };
    //   })
    // );

    this.manageUsuario();
    this.mainLoop();
  }

  private mainLoop(): void {
    while (this.running) {
      const teste = Utils.generateDatesArray();
      console.table(
        teste.map((item) => {
          return {
            date: item.date,
            horaInicio: item.horaInicio,
            horaFim: item.horaFim,
            disponivel: item.isAvailable,
          };
        })
      );
      this.displayMenu();
      const option = Number(this.ioService.input("Opção Desejada: "));
      this.handleOption(option);
      const date = Utils.generateDatesArray();
    }
  }

  private displayMenu(): void {
    const options = [
      "0 - Sair",
      "1 - Criar Quadra",
      "2 - Agendar Horario",
      "3 - Listar Quadras",
      "4 - Listar Quadras Disponíveis",
      "5 - Listar Reservas",
    ];
    this.ioService.print(options.join("\n"));
  }

  private handleOption(option: number): void {
    switch (option) {
      case 0:
        this.running = false;
        break;
      case 1:
        this.quadraManager.addQuadra();
        break;
      case 2:
        this.handleAddReserva();
        break;
      case 3:
        this.ioService.printTable(this.quadraManager.getQuadras());
        break;
      case 4:
        this.ioService.printTable(this.quadraManager.getAvailableQuadras());
        break;
      case 5:
        this.ioService.printTable(this.reservaManager.listReservas());
        break;
      default:
        this.ioService.print("Opção inválida.");
        break;
    }
  }

  private handleAddReserva(): void {
    if (!this.usuario) {
      this.ioService.print(
        "Nenhum usuário logado. Por favor, reinicie o sistema."
      );
      return;
    }
    this.reservaManager.addReserva(
      this.usuario.nome,
      this.quadraManager.getQuadras()
    );
  }

  private manageUsuario(): void {
    this.ioService.print("Bem vindo ao sistema de agendamento de quadras");
    const nome = this.ioService.input("Seu Nome: ");
    const telefone = this.ioService.input("Seu Telefone: ");
    this.usuario = new Usuario({ nome, telefone });
  }
}

new Main();
