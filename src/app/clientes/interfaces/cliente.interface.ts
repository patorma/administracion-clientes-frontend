import { Ciudad } from "./ciudad.interface";

export interface Cliente {
  id:              number;
  nombre:          string;
  apellido:        string;
  email:           string;
  telefono:        number;
  fechaNacimiento: Date;
  ciudad:          Ciudad;
}




