import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5433,
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async getMedecins(): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query(
      "Select * from Hopital_BD.Medecins"
    );
    client.release();
    return result;
  }

  public async getServices(): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const result: pg.QueryResult = await this.pool.query(
      "Select * from Hopital_BD.Services"
    );
    client.release();
    return result;
  }

  public async addMedecin(medecin: any): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const values: any[] = [
      medecin.prenom,
      medecin.nom,
      medecin.specialite,
      medecin.anneesexperience,
      medecin.idservice,
    ];
    const query: string = `INSERT INTO Hopital_BD.Medecins ( prenom, nom, specialite, anneesExperience, idService) VALUES ($1, $2, $3, $4, $5)`;
    const result: pg.QueryResult = await this.pool.query(query, values);
    client.release();
    return result;
  }

  public async deleteMedecin(idMedecin: string): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const query: string = `DELETE FROM Hopital_BD.Medecins WHERE idMedecin = '${idMedecin}'`;
    const result: pg.QueryResult = await this.pool.query(query);
    client.release();
    return result;
  }

  public async updateMedecinInfo(medecin: any): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();
    const query: string = `UPDATE Hopital_BD.Medecins SET prenom = '${medecin.prenom}', nom = '${medecin.nom}', specialite = '${medecin.specialite}', anneesExperience = ${medecin.anneesexperience}, idService = ${medecin.idservice} WHERE idMedecin = ${medecin.idmedecin}`;
    console.log(query);
    const result: pg.QueryResult = await this.pool.query(query);
    console.log(result);
    client.release();
    return result;
  }
}
