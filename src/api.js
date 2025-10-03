import axios from "axios";

//IP y puerto por los de tu servidor backend
//Se pone la ip de la maquina local donde se corre el backend
//para ver la ip de tu maquina local corre ipconfig en cmd (windows) o ifconfig en mac/linux
const API = axios.create({
  baseURL: "http://10.185.251.7:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
