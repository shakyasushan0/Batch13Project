import bcrypt from "bcryptjs";

const users = [
  {
    fullname: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    fullname: "John Doe",
    email: "john.doe@example.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
  {
    fullname: "Jane Doe",
    email: "jane.doe@example.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
];

export default users;
