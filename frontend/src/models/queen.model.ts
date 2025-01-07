// interfaz para poder alimentar el constructor con un objeto, para q el orden sea irrelevante
interface QueenResponseModel {
  queenId: string;
  queenName: string;
  yearOfBirth: string;
  yearOfDeath: string;
  origin: string;
  mother: string;
  supplierId: string;
}

export class QueenModel implements QueenResponseModel {
  constructor(
    // recibo el objeto de datos del backend
    data: QueenResponseModel,
    // asigno a propiedades de clase; sintaxis abreviada TS
    public queenId: string = data.queenId,
    public queenName: string = data.queenName,
    public yearOfBirth: string = data.yearOfBirth,
    public yearOfDeath: string = data.yearOfDeath,
    public origin: string = data.origin,
    public mother: string = data.mother,
    public supplierId: string = data.supplierId
  ) {}
}
