// interfaz para poder alimentar el constructor con un objeto, para q el orden sea irrelevante
interface SupplierResponseModel {
  supplierId: string;
  supplierName: string;
  phone: string;
  email: string;
  web: string;
  locality: string;
  street: string;
  addressNumber: string;
  notes: string;
}

export class SupplierModel implements SupplierResponseModel {

  constructor(
    // recibo el objeto de datos del backend
    data: SupplierResponseModel,
    // asigno a propiedades de clase; sintaxis abreviada TS
    public supplierId: string = data.supplierId,
    public supplierName: string = data.supplierName,
    public phone: string = data.phone,
    public email: string = data.email,
    public web: string = data.web,
    public locality: string = data.locality,
    public street: string = data.street,
    public addressNumber: string = data.addressNumber,
    public notes: string = data.notes) {
    
  }
}
