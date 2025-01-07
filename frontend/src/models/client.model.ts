// interfaz para poder alimentar el constructor con un objeto, para q el orden sea irrelevante
interface ClientResponseModel {
  clientId: string;
  clientName: string;
  requiredServices: string;
  phone: string;
  email: string;
  locality: string;
  street: string;
  addressNumber: string;
  notes: string;
}

export class ClientModel implements ClientResponseModel {
  constructor(
    // recibo el objeto de datos del backend
    data: ClientResponseModel,
    // asigno a propiedades de clase; sintaxis abreviada TS
    public clientId: string = data.clientId,
    public clientName: string = data.clientName,
    public requiredServices: string = data.requiredServices,
    public phone: string = data.phone,
    public email: string = data.email,
    public locality: string = data.locality,
    public street: string = data.street,
    public addressNumber: string = data.addressNumber,
    public notes: string = data.notes
  ) {}
}
