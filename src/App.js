import { useState } from "react";
import "./App.css";
import "./Card.css";
import "./Form.css";

const initialGroups = [
  {
    id: 1,
    name: "Disney +",
    members: [
      { id: 1, name: "Pedro" },
      { id: 2, name: "Maria" },
    ],
    price: 33.9,
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktQ6tLIR6ypy44Ry1qk-MUpVcZ126mZGoEJjrI_5kpQ&s",
  },
  {
    id: 2,
    name: "Spotify",
    members: [
      { id: 3, name: "Pedro" },
      { id: 4, name: "Maria" },
    ],
    price: 21.9,
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
  },
  {
    id: 3,
    name: "Google One",
    members: [
      { id: 5, name: "Joca" },
      { id: 6, name: "Julia" },
    ],
    price: 39.99,
    imageURL:
      "https://downloadr2.apkmirror.com/wp-content/uploads/2023/11/VPN-by-Google-One_round-384x384.png",
  },
];

function handleSplitPrice(price, qtd) {
  return (price / qtd).toFixed(2);
}

function App() {
  const [showAddGrupForm, setShowAddGrupForm] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupPrice, setGroupPrice] = useState("");
  const [groupMembers, setGroupMembers] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [isEditMembers, setIsEditMembers] = useState(false);

  const [groups, setGroups] = useState(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newMember, setNewMember] = useState(null);
  const [newImage, setNewImage] = useState("");

  const [isAddMembers, setIsAddMembers] = useState(true);

  function handleShowGroupForm(e) {
    e.preventDefault();
    setIsEditMembers(false);
    setShowAddGrupForm((group) => !group);
  }

  function handleShowEditForm({ group }) {
    setSelectedGroup(group);
    setShowAddGrupForm(false);
    setIsEditMembers(true);
    setNewName(group.name);
    setNewPrice(group.price);
    setNewImage(group.imageURL);
  }

  function handleAddGroup(e) {
    e.preventDefault();
    setShowAddGrupForm(false);
    setIsEditMembers(false);
    console.log(groupMembers);

    setGroups([
      ...groups,
      {
        id: crypto.randomUUID(),
        name: groupName,
        members: [{ id: crypto.randomUUID(), name: groupMembers }],
        price: groupPrice,
        imageURL: groupImage,
      },
    ]);

    setGroupName("");
    setGroupPrice("");
    setGroupMembers("");
    setGroupImage("");
    setIsAddMembers(true);
  }

  function handleEditMembers(e) {
    e.preventDefault();
    if (!newName || !newPrice || !newImage) {
      alert("Por favor, preencha todos os campos");
      return false;
    }

    console.log(newMember);

    if (newMember) {
      setGroups((groups) =>
        groups.map((group) =>
          group.id === selectedGroup.id
            ? {
                id: selectedGroup.id,
                name: newName,
                members: [
                  ...selectedGroup.members,
                  {
                    id: crypto.randomUUID(),
                    name: newMember,
                  },
                ],
                price: newPrice,
                imageURL: newImage,
              }
            : group
        )
      );
    } else {
      setGroups((groups) =>
        groups.map((group) =>
          group.id === selectedGroup.id
            ? {
                id: selectedGroup.id,
                name: newName,
                members: [...selectedGroup.members],
                price: newPrice,
                imageURL: newImage,
              }
            : group
        )
      );
    }

    setNewName("");
    setNewImage("");
    setNewMember("");
    setNewPrice("");
    setIsAddMembers(true);
    setIsEditMembers(false);
  }

  function handleDeleteMember(id) {
    setGroups((groups) =>
      groups.map((group) =>
        group.members.length > 1
          ? {
              id: group.id,
              name: group.name,
              members: group.members.filter((member) => member.id !== id),
              price: group.price,
              imageURL: group.imageURL,
            }
          : group
      )
    );
  }

  function handleDeleteGroup(groupToDelete) {
    const newGroups = groups.filter(
      (group) => group.id !== groupToDelete.group.id
    );

    setGroups(newGroups);
  }

  return (
    <div className="App">
      <div className="cardBox">
        {groups.map((group) => (
          <div className="Card" key={group.name}>
            <img src={group.imageURL} alt={group.name} />
            <div className="text">
              <span>{group.name}</span>
              <span>
                Membros:{" "}
                {group.members.map((m) => (
                  <button
                    className="memberButton"
                    onClick={(e) => handleDeleteMember(m.id)}
                  >
                    {m.name + " "}
                  </button>
                ))}
              </span>
              <span>
                Valor repartido:{" "}
                {handleSplitPrice(group.price, group.members.length)}
              </span>
            </div>
            <button onClick={() => handleShowEditForm({ group })}>
              {" "}
              Select
            </button>
            <button
              className="btnDelete"
              onClick={() => handleDeleteGroup({ group })}
            >
              {" "}
              Excluir
            </button>
          </div>
        ))}
        {!showAddGrupForm && (
          <button
            onClick={(e) => handleShowGroupForm(e)}
            className="buttonAddGroup"
          >
            Add grupo
          </button>
        )}
        {showAddGrupForm && (
          <div className="formAddBox">
            <form onSubmit={(e) => handleAddGroup(e)} className="Form">
              <label htmlFor="groupName">Nome do Grupo:</label>
              <input
                type="text"
                name="groupName"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <label htmlFor="groupPrice">Valor do grupo:</label>
              <input
                type="text"
                name="groupPrice"
                id="groupPrice"
                value={groupPrice}
                onChange={(e) => setGroupPrice(e.target.value)}
              />
              <label htmlFor="groupMembers">Admin do grupo:</label>

              <input
                type="text"
                name="groupMembers"
                id="groupMembers"
                value={groupMembers}
                onChange={(e) => setGroupMembers(e.target.value)}
              />
              <label htmlFor="Imagem URL">Imagem do Grupo:</label>
              <input
                type="text"
                name="groupImage"
                id="groupImage"
                value={groupImage}
                onChange={(e) => setGroupImage(e.target.value)}
              />
              <input type="submit" value="Enviar" />
            </form>
          </div>
        )}
      </div>

      {isEditMembers && (
        <div className="formEditGroup">
          <form className="Form" onSubmit={(e) => handleEditMembers(e)}>
            <label htmlFor="groupName">Nome do Grupo:</label>
            <input
              type="text"
              name="groupName"
              id="groupName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label htmlFor="groupPrice">Valor do grupo:</label>
            <input
              type="text"
              name="groupPrice"
              id="groupPrice"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            Deseja incluir novos membros no grupo?
            <label>
              <input
                type="checkbox"
                name="yes"
                id="yes"
                value={isAddMembers}
                onChange={(e) => setIsAddMembers(!isAddMembers)}
              />{" "}
              Sim
            </label>
            <label htmlFor="groupMembers">Adicione Membros:</label>
            <input
              type="text"
              name="groupMembers"
              id="groupMembers"
              onChange={(e) => setNewMember(e.target.value)}
              disabled={isAddMembers ? true : false}
            />
            <label htmlFor="Imagem URL">Imagem do Grupo:</label>
            <input
              type="text"
              name="groupImage"
              id="groupImage"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <input type="submit" value="Enviar" />
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
