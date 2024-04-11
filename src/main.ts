import Quadra from "./modules/Quadra";
import Reserva from "./modules/Reserva";
import User from "./modules/User";

class Main {
  constructor() {
    console.log("Hello World!");

    new User();
    new Quadra();
    new Reserva();
  }
}

new Main();
