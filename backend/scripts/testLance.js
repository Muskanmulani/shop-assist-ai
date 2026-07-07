import { getDB } from "../services/lanceService.js";

const db = await getDB();

console.log("LanceDB connected:", db);