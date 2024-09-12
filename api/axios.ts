import axios from "axios";

export const url = "http://localhost:3000";
// export const url = "https://anime-db.p.rapidapi.com/";


export const instance = axios.create({
  baseURL: url,
});

// const config = {
//   headers: { 
//     'x-rapidapi-key': '125e70b79fmsh6bf7a0760afa960p125cd8jsn2c4b49d95196',
//     'x-rapidapi-host': 'anime-db.p.rapidapi.com'
//    }
// };


export const filmsAPI = {
  getFilms() {
    return instance.get("/catalog");
    // return instance.get("/anime?page=1&size=100", config);
  },
};


