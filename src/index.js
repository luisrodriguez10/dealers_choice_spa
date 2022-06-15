const axios = require("axios");
const playersList = document.querySelector("#players-list");
const infoList = document.querySelector("#info-list");
const playerForm = document.querySelector("form");
const fNameInput = document.querySelector("#firstName");
const lNameInput = document.querySelector("#lastName");
const currTeamInput = document.querySelector("#currentTeam");
const nationInput = document.querySelector("#nationality");

let players;

const renderPlayers = () => {
  const playerSelected = window.location.hash.slice(1);
  const html = players
    .map((player) => {
      return `
            <li ${playerSelected === player.id ? "class = 'selected'" : ""}>
                <a href='#${playerSelected === player.id ? "" : player.id}'>
                    ${player.firstName} ${player.lastName}
                </a>
                </br>
                <button id='btn-delete' data-id='${player.id}'>Delete</button>
            </li>
        `;
    })
    .join("");
  playersList.innerHTML = html;
};

const renderPlayerInfo = async (playerId) => {
  const url = `/api/players/${playerId}`;
  const player = (await axios(url)).data;
  if (typeof player === "object") {
    const html = `
    <li>
        Current Team: ${player.currentTeam}
        
    </li>
    <li>
    Nationality: ${player.nationality}
    </li>
  `;
    infoList.innerHTML = html;
  } else {
    infoList.innerHTML = "";
  }
};

playerForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const firstName = fNameInput.value;
  const lastName = lNameInput.value;
  const currentTeam = currTeamInput.value;
  const nationality = nationInput.value;
  try {
    await axios.post("/api/players", {
      firstName,
      lastName,
      currentTeam,
      nationality,
    });
    init();
    fNameInput.value = "";
    lNameInput.value = "";
    currTeamInput.value = "";
    nationInput.value = "";
  } catch (ex) {
    console.log(ex);
  }
});

playersList.addEventListener("click", async (ev) => {
  if (ev.target.tagName === "BUTTON") {
    const playerId = ev.target.getAttribute("data-id");
    await axios.delete(`/api/players/${playerId}`);
    init();
  }
});

window.addEventListener("hashchange", async () => {
  const playerId = window.location.hash.slice(1);
  renderPlayerInfo(playerId);
  renderPlayers();
});

const init = async () => {
  const playerId = window.location.hash.slice(1);
  const response = await axios.get("/api/players");
  players = response.data;
  renderPlayers();
  if (playerId) {
    renderPlayerInfo(playerId);
  }
};

init();
