class Utils {
  static generateDatesArray = (data: Date) => {
    const dates: string[] = [];
    const startTime = 13; // 13:00, início do horário de funcionamento
    const endTime = 22; // 22:00, fim do horário de funcionamento

    // Configurando a data de início para hoje às 13:00
    const startDate = new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate(),
      startTime
    );

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 14);
    endDate.setHours(endTime);

    while (startDate < endDate) {
      for (let hour = startTime; hour < endTime; hour++) {
        const mothLabel = startDate.getUTCMonth() + 1;
        const dateString = `${startDate.getDate()}/${
          mothLabel.toString().length > 1 ? mothLabel : "0" + mothLabel
        }-${hour}:00-${hour + 1}:00`;
        dates.push(dateString);
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };
}

export default Utils;
