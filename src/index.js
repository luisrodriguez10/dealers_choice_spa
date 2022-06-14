const axios = require("axios");
const playersList = document.querySelector("#players-list");
const infoList = document.querySelector("#info-list");

let players;

const renderPlayers = () => {
  const html = players
    .map((player) => {
      return `
            <li>
                <a href='#${player.id}'>
                    ${player.firstName} ${player.lastName}
                </a>
            </li>
        `;
    })
    .join("");
  playersList.innerHTML = html;
};

window.addEventListener('hashchange', () =>{
    const playerId = window.location.hash.slice(1)
    
})

const init = async () => {
  const response = await axios.get("/api/players");
  players = response.data;
  renderPlayers();
};

init();
