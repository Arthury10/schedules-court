import IOService from "../IoService";
import Quadra, { IQuadra } from "../Quadra";

class QuadraManager {
  quadras: Quadra[] = [];

  constructor(private ioService: IOService, quadrasMocked: IQuadra[] = []) {
    this.loadQuadras(quadrasMocked);
  }

  private loadQuadras(quadrasMocked: IQuadra[]): void {
    this.quadras = quadrasMocked.map((data) => new Quadra(data));
  }

  addQuadra(): void {
    const nome = this.ioService.input("Nome da Quadra: ");
    const esporte = this.ioService.input("Modalidade: ");
    const novaQuadra = new Quadra({ nome, esporte, horariosIndisponiveis: [] });
    this.quadras.push(novaQuadra);
    this.ioService.print("Quadra criada com sucesso!");
    this.ioService.printTable([novaQuadra]);
  }

  findQuadraByName(nome: string): Quadra | undefined {
    return this.quadras.find((quadra) => quadra.nome === nome);
  }

  getQuadras(): Quadra[] {
    return this.quadras;
  }

  getAvailableQuadras(): any[] {
    return this.quadras.map((quadra) => quadra.horariosDisponiveis());
  }
}

export default QuadraManager;
