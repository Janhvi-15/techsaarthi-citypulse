import bcrypt from "bcryptjs";
let text = bcrypt.hashSync("Admin@123", 10);
console.log(text)
