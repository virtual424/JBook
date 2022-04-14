import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.route("/cells").get(async (req, res, next) => {
    try {
      //Read the file
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      //Parse a list of cells out of it.
      //Send the list of cells to the browser
      res.send(JSON.parse(result));
    } catch (error: any) {
      // if read throws an error, inspect the error, see if it says that the file doesn't exists

      if (error.code == "ENOENT") {
        //Add code to create a file and add default values
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.route("/cells").post(async (req, res, next) => {
    //Take the list of cells from req obj, serialize them.

    const { cells }: { cells: Cell[] } = req.body;

    //Write the cells into the file

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
