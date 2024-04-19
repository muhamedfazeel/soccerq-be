export interface TeamDetailDto {
  id: number;
  name: string;
  colour: string;
  manager: Manager;
  players: Manager[];
}

export interface Manager {
  id: number;
  name: string;
  imageUrl: string;
}
