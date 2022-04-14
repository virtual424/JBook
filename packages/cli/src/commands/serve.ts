import { Command } from "commander";
import { serve } from "@jscodepad/local-api";
import path from "path";

interface optionsType {
  port: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "notebook.js", options: optionsType) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`
      );
    } catch (error: any) {
      if (error.code === "EADDRINUSE") {
        console.error("Port is in use. Try running on a different port");
      } else {
        console.log("Heres the problem", error.message);
      }

      process.exit(1);
    }
  });
