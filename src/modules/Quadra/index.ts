export interface IQuadra {
  nome: string;
  esporte: string;
  horariosIndisponiveis?: string[];
}

class Quadra {
  nome: string;
  esporte: string;
  horariosIndisponiveis?: string[] = [];

  constructor(data: IQuadra) {
    const { nome, esporte, horariosIndisponiveis } = data;
    this.nome = nome;
    this.esporte = esporte;
    this.horariosIndisponiveis = horariosIndisponiveis || [];
  }

  estaDisponivel(horario: string): boolean {
    const disponivel = this.horariosIndisponiveis?.find(
      (item) => item === horario
    );

    if (disponivel) {
      return false;
    }

    return true;
  }
}

export default Quadra;
