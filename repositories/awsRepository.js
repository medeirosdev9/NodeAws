import {db} from "..db.js"

export const getAllaws = (calback) => {
    const query = "SELECT * FROM aws";
    db.query(query, calback)
};

