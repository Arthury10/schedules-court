interface IQuadra {
  nome: string;
  esporte: string;
  horariosIndisponiveis: Date[];
}

class Quadra {
  nome: string;
  esporte: string;
  horariosIndisponiveis: Date[] = [];

  constructor(data: IQuadra) {
    const { nome, esporte, horariosIndisponiveis } = data;
    this.nome = nome;
    this.esporte = esporte;
    this.horariosIndisponiveis;

    
    console.log("Hello Quadra!!");
  }
}

export default Quadra;
