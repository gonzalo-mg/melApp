// interfaz para poder alimentar el constructor con un objeto, para q el orden sea irrelevante
interface ApiaryResponseModel {
  apiaryId: string;
  apiaryName: string;
  locality: string;
  latitude: string;
  longitude: string;
  nomad: string;
  vegetation: string;
  hmToWater: string;
  startDate: string;
  endDate: string;
  userIsOwner: string;
}

export class ApiaryModel implements ApiaryResponseModel {
  constructor(
    // recibo el objeto de datos del backend
    data: ApiaryResponseModel,
    // asigno a propiedades de clase; sintaxis abreviada TS
    public apiaryId: string = data.apiaryId,
    public apiaryName: string = data.apiaryName,
    public locality: string = data.locality,
    public latitude: string = data.latitude,
    public longitude: string = data.longitude,
    public nomad: string = data.nomad,
    public vegetation: string = data.vegetation,
    public hmToWater: string = data.hmToWater,
    public startDate: string = data.startDate,
    public endDate: string = data.endDate,
    public userIsOwner: string = data.userIsOwner
  ) {}
}
