export interface Employee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: number; //  0 => disponible | 1 => vacaciones | 2 => no disponible | 3 => enfermo
  position?: string;
}
