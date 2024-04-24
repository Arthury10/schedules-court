import Horario from "../modules/Horario";

class Utils {
  static parseDate(input: string): Date {
    const [day, month] = input.split("/").map(Number);
    const year = new Date().getFullYear(); // Assume o ano atual para a reserva
    return new Date(year, month - 1, day);
  }

  static transformDate(date: string, hour: string): Horario {
    const dateObject = this.parseDate(date);
    const [hourStart, minute] = hour.split(":").map(Number);
    const dateStart = new Date(dateObject.setHours(hourStart, minute, 0, 0));

    const horario = new Horario(dateStart);

    horario.isAvailable = false;

    return horario;
  }

  static generateDatesArray(): Horario[] {
    const date = new Date();

    const horarios: Horario[] = [];
    const startTime = 17;
    const endTime = 22;

    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      startTime
    );

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    endDate.setHours(endTime);

    while (startDate < endDate) {
      for (let hour = startTime; hour < endTime; hour++) {
        startDate.setHours(hour);
        endDate.setHours(hour + 1);
        horarios.push(new Horario(startDate));
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    return horarios;
  }
}

export default Utils;
