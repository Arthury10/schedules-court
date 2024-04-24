import Utils from "../../utils";
import Horario from "../Horario";

export interface IQuadra {
  nome: string;
  esporte: string;
  horariosIndisponiveis?: Horario[];
}

class Quadra {
  nome: string;
  esporte: string;
  horariosIndisponiveis?: Horario[] = [];

  constructor(data: IQuadra) {
    const { nome, esporte, horariosIndisponiveis } = data;
    this.nome = nome;
    this.esporte = esporte;
    this.horariosIndisponiveis = horariosIndisponiveis;
  }

  estaDisponivel(horario: Horario): boolean {
    return !this.horariosIndisponiveis?.some((h) => h.equals(horario));
  }

  adicionarHorarioIndisponivel(horario: Horario): void {
    if (this.estaDisponivel(horario)) {
      this.horariosIndisponiveis?.push(horario);
    }
  }

  horariosDisponiveis(): {
    nome: string;
    esporte: string;
    horariosLivres: Horario[];
  } {
    const horariosLivres = this.calculateAvailableTimes(this);

    return {
      nome: this.nome,
      esporte: this.esporte,
      horariosLivres,
    };
  }

  private calculateAvailableTimes(quadra: Quadra): Horario[] {
    const potentialTimes = Utils.generateDatesArray();

    return potentialTimes.filter((time) => quadra.estaDisponivel(time));
  }
}

export default Quadra;
