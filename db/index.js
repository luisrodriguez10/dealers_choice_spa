const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_express_spa"
);

const Player = conn.define("player", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  currentTeam: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  nationality: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const seeder = async () => {
  await conn.sync({ force: true });
  await Promise.all([
    Player.create({
      firstName: "Lionel",
      lastName: "Messi",
      currentTeam: "PSG",
      nationality: "Argentina",
    }),
    Player.create({
      firstName: "Cristiano",
      lastName: "Ronaldo",
      currentTeam: "Man United",
      nationality: "Portugal",
    }),
    Player.create({
      firstName: "Kylian",
      lastName: "Mbappe",
      currentTeam: "PSG",
      nationality: "France",
    }),
    Player.create({
      firstName: "Neymar",
      lastName: "Junior",
      currentTeam: "PSG",
      nationality: "Brazil",
    }),
    Player.create({
      firstName: "Karim",
      lastName: "Benzama",
      currentTeam: "Real Madrid",
      nationality: "France",
    }),
    Player.create({
      firstName: "Mohammed",
      lastName: "Salah",
      currentTeam: "Liverpool",
      nationality: "Egypt",
    }),
    Player.create({
      firstName: "Kevin",
      lastName: "De Bruyne",
      currentTeam: "Man City",
      nationality: "Belgium",
    }),
    Player.create({
      firstName: "Mohammed",
      lastName: "Salah",
      currentTeam: "Liverpool",
      nationality: "Egypt",
    }),
    Player.create({
      firstName: "Gabriel",
      lastName: "Jesus",
      currentTeam: "Man City",
      nationality: "Brazil",
    }),
    Player.create({
      firstName: "Lucas",
      lastName: "Paqueta",
      currentTeam: "Lyon",
      nationality: "Brazil",
    }),
  ]);
};

module.exports = {
  seeder,
  Player,
};
