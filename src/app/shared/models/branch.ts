export interface getAllBranch {
  id: number;
  name: string;
  isDeleted: boolean;
  status: boolean;
  stateId:number;
  date: string; // Adjusted to string since the API returns date as a string
}
