"use strict";
// Array para armazenar os planetas
let planets = [];
// Função para mostrar os planetas na tela
function showPlanets() {
    const showPlanetsSection = document.querySelector(".showPlanets");
    // Verifica se o elemento showPlanetsSection foi encontrado
    if (!showPlanetsSection) {
        console.error("Elemento 'showPlanetsSection' não encontrado.");
        return;
    }
    // Limpa os elementos filhos
    while (showPlanetsSection.firstChild) {
        showPlanetsSection.removeChild(showPlanetsSection.firstChild);
    }
    // Itera sobre os planetas e os exibe na tela
    planets.forEach((planet, index) => {
        const planetElement = document.createElement("div");
        planetElement.classList.add("planet");
        planetElement.setAttribute("id", `planet${+planet.name}`);
        const planetList = document.createElement("ul");
        // Adiciona os itens de informação do planeta à lista
        const nameItem = document.createElement("li");
        nameItem.textContent = `Planeta: ${planet.name}`;
        planetList.appendChild(nameItem);
        const coordinatesItem = document.createElement("li");
        coordinatesItem.textContent = `Coordenadas - W: ${planet.coordinates[0]}, X: ${planet.coordinates[1]}, Y: ${planet.coordinates[2]}, Z: ${planet.coordinates[3]}`;
        planetList.appendChild(coordinatesItem);
        const situationItem = document.createElement("li");
        situationItem.textContent = `Situação: ${planet.situation}`;
        planetList.appendChild(situationItem);
        const satellitesItem = document.createElement("li");
        satellitesItem.textContent = `Satélites: ${planet.satellites.join(", ")}`;
        planetList.appendChild(satellitesItem);
        // Adiciona botões de editar e apagar para cada planeta
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => {
            showEditPopup(planet);
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Apagar";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            planets.splice(index, 1);
            showPlanets();
        });
        // Adiciona os elementos à estrutura da página
        planetElement.append(planetList, editButton, deleteButton);
        showPlanetsSection.appendChild(planetElement);
    });
}
// Função para exibir o pop-up de edição de planeta
function showEditPopup(planet) {
    // Cria um elemento de pop-up
    const editPopup = document.createElement("div");
    editPopup.classList.add("edit-popup");
    // Título do pop-up
    const title = document.createElement("h2");
    title.textContent = "Editar Planeta";
    editPopup.appendChild(title);
    // Campo de edição de nome
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "edit-name");
    nameInput.setAttribute("value", planet.name);
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Nome do Planeta:";
    nameLabel.setAttribute("for", "edit-name");
    editPopup.appendChild(nameLabel);
    editPopup.appendChild(nameInput);
    // Campo de edição de situação
    const situationSelect = document.createElement("select");
    situationSelect.setAttribute("id", "edit-PlanetSituation");
    const situationLabel = document.createElement("label");
    situationLabel.textContent = "Situação do Planeta:";
    situationLabel.setAttribute("for", "edit-PlanetSituation");
    ["Habitado", "Habitável", "Inabitável", "Inexplorado"].forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        optionElement.setAttribute("value", option);
        if (option === planet.situation) {
            optionElement.setAttribute("selected", "selected");
        }
        situationSelect.appendChild(optionElement);
    });
    editPopup.append(situationLabel, situationSelect);
    // Campos de edição de coordenadas
    const coordinatesDiv = document.createElement("div");
    coordinatesDiv.setAttribute("class", "Coordinates");
    const coordinatesLabel = document.createElement("label");
    coordinatesLabel.textContent = "Coordenadas do Planeta:";
    coordinatesDiv.appendChild(coordinatesLabel);
    ["W", "X", "Y", "Z"].forEach((coordinate, index) => {
        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("class", "edit-coordinates-input");
        input.setAttribute("value", planet.coordinates[index].toString());
        coordinatesDiv.appendChild(input);
    });
    editPopup.appendChild(coordinatesDiv);
    // Campo de edição de satélites
    const satellitesInput = document.createElement("input");
    satellitesInput.setAttribute("type", "text");
    satellitesInput.setAttribute("id", "edit-satellites-input");
    satellitesInput.setAttribute("value", planet.satellites.join(", "));
    const satellitesLabel = document.createElement("label");
    satellitesLabel.textContent = "Satélites do Planeta:";
    satellitesLabel.setAttribute("for", "edit-satellites-input");
    editPopup.appendChild(satellitesLabel);
    editPopup.appendChild(satellitesInput);
    // Botões de salvar e cancelar
    const saveButton = document.createElement("button");
    saveButton.setAttribute("id", "save-edit");
    saveButton.textContent = "Salvar";
    const cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel-edit");
    cancelButton.textContent = "Cancelar";
    editPopup.appendChild(saveButton);
    editPopup.appendChild(cancelButton);
    // Adiciona o pop-up à página
    document.body.appendChild(editPopup);
    // Adiciona um evento de clique ao botão "Salvar"
    saveButton.addEventListener("click", () => {
        // Atualiza as informações do planeta com os valores dos campos de entrada
        planet.name = nameInput.value;
        planet.situation = situationSelect
            .value;
        planet.coordinates = Array.from(document.querySelectorAll(".edit-coordinates-input")).map((input) => parseInt(input.value));
        planet.satellites = satellitesInput.value.split(", ");
        // Remove o pop-up e atualiza a exibição dos planetas
        document.body.removeChild(editPopup);
        showPlanets();
    });
    // Adiciona um evento de clique ao botão "Cancelar"
    cancelButton.addEventListener("click", () => {
        // Remove o pop-up sem fazer alterações
        document.body.removeChild(editPopup);
    });
}
// No evento de clique do botão "Registrar Planeta", adicione um novo planeta à lista
document.getElementById("add-planet")?.addEventListener("click", () => {
    const nameInput = document.querySelector(".name");
    const situationSelect = document.getElementById("PlanetSituation");
    const coordinatesInputs = document.querySelectorAll(".coordinates-input");
    const satellitesInput = document.getElementById("satellites-input");
    const name = nameInput.value;
    const situation = situationSelect.value;
    const coordinates = Array.from(coordinatesInputs).map((input) => parseInt(input.value));
    const satellites = satellitesInput.value.split(", ");
    // Verifica se os campos obrigatórios estão preenchidos
    if (name.trim() === "" ||
        situation.trim() === "" ||
        coordinates.some((coord) => isNaN(coord))) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    // Cria um novo planeta e o adiciona à lista
    const newPlanet = { name, situation, coordinates, satellites };
    planets.push(newPlanet);
    showPlanets();
    // Limpa os campos após adicionar o planeta
    nameInput.value = "";
    situationSelect.selectedIndex = 0;
    coordinatesInputs.forEach((input) => (input.value = ""));
    satellitesInput.value = "";
});
// Inicializa a exibição dos planetas
showPlanets();
