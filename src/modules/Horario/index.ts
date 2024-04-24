class Horario {
  date: Date;
  horaInicio: string;
  horaFim: string;
  isAvailable: boolean = true;

  constructor(date: Date) {
    this.date = new Date(date);
    this.horaInicio = this.date.getHours().toLocaleString();
    this.horaFim = (this.date.getHours() + 1).toLocaleString();
  }

  equals(outro: Horario): boolean {
    return (
      this.date === outro.date &&
      this.horaInicio === outro.horaInicio &&
      this.horaFim === outro.horaFim
    );
  }

  overlapsWith(outro: Horario): boolean {
    return this.horaInicio < outro.horaFim && this.horaFim > outro.horaInicio;
  }

  toString(): string {
    const formateDay = this.date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });

    return `${formateDay} das ${this.horaInicio}:00 até ${this.horaFim}:00`;
  }
}

export default Horario;
