// interfaz para poder alimentar el constructor con un objeto, para q el orden sea irrelevante
interface HarvestResponseModel {
  harvestId: string;
  harvestDate: string;
  kgHoney: string;
  kgPollen: string;
  beehiveId: string;
  numFrames: string;
  numSuperChambers: string;
  numBroodChamners: string;
  queenExcluder: string;
  screenedBottom: string;
  slattedRack: string;
  landingBoard: string;
  entranceReducer: string;
  pollenTrap: string;
  queenId: string;
  apiaryId: string;
  apiaryName: string;
  locality: string;
  latitude: string;
  longitude: string;
  nomad: string;
  vegetation: string;
  hmToWater: string;
  clientId: string;
  userEmail: string;
  created: string;
}

export class HarvestModel implements HarvestResponseModel {
  constructor(
    // recibo el objeto de datos del backend
    data: HarvestResponseModel,
    // asigno a propiedades de clase; sintaxis abreviada TS
    public harvestId: string = data.harvestId,
    public harvestDate: string = data.harvestDate,
    public kgHoney: string = data.kgHoney,
    public kgPollen: string = data.kgPollen,
    public beehiveId: string = data.beehiveId,
    public numFrames: string = data.numFrames,
    public numSuperChambers: string = data.numSuperChambers,
    public numBroodChamners: string = data.numBroodChamners,
    public queenExcluder: string = data.queenExcluder,
    public screenedBottom: string = data.screenedBottom,
    public slattedRack: string = data.slattedRack,
    public landingBoard: string = data.landingBoard,
    public entranceReducer: string = data.entranceReducer,
    public pollenTrap: string = data.pollenTrap,
    public queenId: string = data.queenId,
    public apiaryId: string = data.apiaryId,
    public apiaryName: string = data.apiaryName,
    public locality: string = data.locality,
    public latitude: string = data.latitude,
    public longitude: string = data.longitude,
    public nomad: string = data.nomad,
    public vegetation: string = data.vegetation,
    public hmToWater: string = data.hmToWater,
    public clientId: string = data.clientId,
    public userEmail: string = data.userEmail,
    public created: string = data.created
  ) {}
}
