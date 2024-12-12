export interface IDataRecords {
  name: string;
  plate_vehicle: string;
  plate_bodywork: string;
  in: string;
  out: string;
  situation: string;
  images: {
    user: string;
    car: string;
  };
  vehicle: {
    vehicle_plate: string;
    model: string;
    year: number;
    color: string;
    img: string;
    mark: string;
  };
  driver: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    cpf: string;
    function: string;
  };
}