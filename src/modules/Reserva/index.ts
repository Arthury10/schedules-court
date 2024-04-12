interface IReserva {
  nomeQuadra: string;
  nomeUsuario: string;
  horario: string;
  quantidade: number;
}

class Reserva {
  nomeQuadra: string;
  nomeUsuario: string;
  horario: string;
  quantidade: number;

  constructor(data: IReserva) {
    const { horario, nomeQuadra, nomeUsuario, quantidade } = data;

    this.nomeQuadra = nomeQuadra;
    this.nomeUsuario = nomeUsuario;
    this.horario = horario;
    this.quantidade = quantidade;
  }
}

export default Reserva;
