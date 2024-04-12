interface IUsuario {
  nome: string;
  telefone: string;
}

class Usuario {
  nome: string;
  telefone: string;
  constructor(data: IUsuario) {
    const { nome, telefone } = data;

    this.nome = nome;
    this.telefone = telefone;
  }
}

export default Usuario;
