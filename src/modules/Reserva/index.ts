import Horario from "../Horario";

export interface IReserva {
  nomeQuadra: string;
  nomeUsuario: string;
  horario: Horario;
}

class Reserva {
  nomeQuadra: string;
  nomeUsuario: string;
  horario: Horario;

  constructor(data: IReserva) {
    const { horario, nomeQuadra, nomeUsuario } = data;
    this.nomeQuadra = nomeQuadra;
    this.nomeUsuario = nomeUsuario;
    this.horario = horario;
  }

  isValid(): boolean {
    const duration =
      (this.horario.date.getTime() - this.horario.date.getTime()) /
      (1000 * 60 * 60);
    return duration > 0;
  }
}

export default Reserva;
