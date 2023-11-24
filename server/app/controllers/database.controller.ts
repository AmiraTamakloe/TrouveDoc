import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import * as pg from "pg";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService)
    private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();
    router.post("/medecins", async (req, res, next) => {
      await this.databaseService
        .addMedecin(req.body)
        .then((result) => {
          res.json(result);
        })
        .catch((error: Error) => {
          console.error(error.stack);
          res.status(400).json(error.message);
        });
    });
    router.put("/medecins", async (req, res, next) => {
      await this.databaseService
        .updateMedecinInfo(req.body)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.get("/medecins", async (req, res, next) => {
      await this.databaseService
        .getMedecins()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.delete("/medecins/:idMedecin", async (req, res, next) => {
      await this.databaseService
        .deleteMedecin(req.params.idMedecin)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    router.get("/services", async (req, res, next) => {
      await this.databaseService
        .getServices()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((error: Error) => {
          console.error(error.stack);
        });
    });
    return router;
  }
}
