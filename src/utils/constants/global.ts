import { isAndroid } from "../Helper";

export const SERVERPATH: string = isAndroid() ? "http://10.0.2.2:3500" : "http://localhost:3500";
