import Utils from "../../utils";
import IOService from "../IoService";
import Quadra from "../Quadra";
import Reserva, { IReserva } from "../Reserva";

type ReservaData = IReserva & { time: string };

class ReservaManager {
  private ioService: IOService;
  reservas: Reserva[] = [];

  constructor(ioService: IOService) {
    this.ioService = ioService;
  }

  private validateInput(date: string, horario: string): boolean {
    return date.length > 0 && horario.length > 0;
  }

  addReserva(nomeUsuario: string, quadras: Quadra[]): void {
    this.ioService.print("Adicionar Reserva");
    this.ioService.print("Quadras disponíveis:");
    this.ioService.printTable(
      quadras.map(({ nome, esporte }) => ({ nome, esporte }))
    );

    const nomeQuadra = this.ioService.input("Nome da Quadra: ");
    const quadra = quadras.find((quadra) => quadra.nome === nomeQuadra);

    if (!quadra) {
      this.ioService.print("Quadra não encontrada");
      return;
    }

    this.ioService.print(`Horários disponíveis para a quadra: ${quadra.nome}`);
    const horariosDisponiveis = quadra
      .horariosDisponiveis()
      .horariosLivres.filter((item) => item.isAvailable);

    this.ioService.printTable(
      horariosDisponiveis.map((item) => ({ horario: item.toString() }))
    );

    const date = this.ioService.input("Dia ex:(13/04): ");
    const horario = this.ioService.input("Horário ex:(16:00): ");

    if (!this.validateInput(date, horario)) {
      this.ioService.print("Data ou horário inválido");
      return;
    }

    const horarioObjeto = Utils.transformDate(date, horario);

    if (!quadra.estaDisponivel(horarioObjeto)) {
      this.ioService.print("Horário não disponível");
      return;
    }

    const reserva = new Reserva({
      nomeQuadra: quadra.nome,
      nomeUsuario,
      horario: horarioObjeto,
    });

    this.reservas.push(reserva);
    quadra.adicionarHorarioIndisponivel(horarioObjeto);
    this.ioService.print("Reserva criada com sucesso!");
    this.ioService.printTable([reserva]);
  }

  listReservas(): ReservaData[] {
    const reserva = this.reservas.map((reserva) => ({
      ...reserva,
      time: reserva.horario.toString(),
    }));

    return reserva;
  }
}

export default ReservaManager;
