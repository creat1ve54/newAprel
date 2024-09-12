export interface IFilm {
  id: number;
  synopsis: string;
  image: string,
  genres: Array<string>,
  link: string,
  ranking: number,
  title: string,
  episodes: number,
}


export interface IGenre {
  id: number;
  name: string;
}

export interface IEpisodes {
  id: number;
  name: number;
}
