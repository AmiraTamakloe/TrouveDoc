// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, of } from "rxjs";
import { Medecin } from "../../../../common/tables/Medecin";
import { Service } from "../../../../common/tables/Service";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  public getMedecins(): Observable<Medecin[]> {
    return this.http
      .get<Medecin[]>(this.BASE_URL + `/medecins`)
      .pipe(catchError(this.handleError<Medecin[]>("getMedecins")));
  }

  public getServices(): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.BASE_URL + `/services`)
      .pipe(catchError(this.handleError<Service[]>("getService")));
  }

  public deleteMedecin(idMedecin: string): Observable<Medecin> {
    return this.http
      .delete<Medecin>(this.BASE_URL + `/medecins/${idMedecin}`)
      .pipe(catchError(this.handleError<Medecin>("deleteMedecin")));
  }

  public addMedecin(medecin: Medecin): Observable<Medecin> {
    return this.http
      .post<Medecin>(this.BASE_URL + `/medecins`, medecin)
      .pipe(catchError(this.handleError<Medecin>("addMedecin")));
  }

  public updateMedecin(medecin: Medecin): Observable<Medecin> {
    return this.http
      .put<Medecin>(this.BASE_URL + `/medecins`, medecin)
      .pipe(catchError(this.handleError<Medecin>("updateMedecin")));
  }


  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
