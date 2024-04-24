import PromptSync from "prompt-sync";

class IOService {
  private prompt = PromptSync()

  input(message: string): string {
    return this.prompt(message);
  }

  print(message: any): void {
    console.log(message);
  }

  printTable(data: any): void {
    console.table(data);
  }
}

export default IOService