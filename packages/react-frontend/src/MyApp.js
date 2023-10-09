// src/MyApp.js
import Table from "./Table";
import Form from './Form';
import React, {useState, useEffect} from 'react';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter (index) {
    let id = -1;
    for(let i = 0; i < characters.length; i++) {
      if(i == index) id = characters[i].id;
    }
    const updated = characters.filter((character, i) => {
      return i !== index
    });

    console.log('id ' + id);
    deleteUser(id)
      .then(() => {
        if (id != -1) setCharacters(updated);
      })
      .catch((error) => {
        console.log(error);
      }
    )
  }

  function deleteUser(id) {
    console.log('Http://localhost:8000/users/' + id);
    const promise = fetch('Http://localhost:8000/users/' + id, {
      method: "DELETE",
    }).then((res) => {
      console.log(res.status);
      if(res.status !== 204) {
        throw new Error('User deletion failed');
      } else
        return res.data;
    })

    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then((res) => {
        if (person != null) setCharacters([...characters, person]);
      })
      .catch((error) => {
        console.log(error);
      }
    )
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then((response) => {
      if(response.status !== 201) {
        throw new Error('User insertion failed');
      } else
        return response.json();
    }).then((data) => {
      person.id = data.id
    })
    return promise
  }

  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList}/>
    </div>
  )
}
export default MyApp;
