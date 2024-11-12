import Users from "./Users.js";

declare global {
    namespace Express {
        interface Request {
            user?: Users; 
        }
    }
}

