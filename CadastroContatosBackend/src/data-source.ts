import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "./entities/user";
import { Contact } from "./entities/contact";
import { InitialMigration1680916251982 } from "./migrations/1680916251982-InitialMigration";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, //mudar para true depois da produção
  logging: true,
  entities: [User, Contact],
  migrations: [InitialMigration1680916251982],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

export { AppDataSource };
