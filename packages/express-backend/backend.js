// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const MAX_ID = 10000;

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});     

app.get('/users', (req, res) => {
    res.send(users);
}); 

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id); 
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    req.body.id = generateId()
    let user = addUser(userToAdd);
    if (user != null) {
        console.log("sent " + user)
        res.status(201).send(user);
    }
});

const deleteUser = (id) => {
    let deleted = undefined;
    users['users_list'] = users['users_list'].filter(user => {
        console.log(user)
        console.log(user.id)
        if(user.id != id) {
            deleted = user;
            console.log("true");
            return true;
        }
        console.log("false");

        return false;
    });

    return deleted;
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let user = deleteUser(id);
    if (user === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.status(204).send('no content returned.');
    }}
);

const findUserByNameAndJob = (name, job) => { 
    let namedUsers = users['users_list']
        .filter( (user) => user['name'] === name); 
    namedUsers = namedUsers
    .filter( (user) => user['job'] === job); 
    return namedUsers
}   

app.get('/users/:name/:job', (req, res) => {
    const name = req.params['name'];
    const job = req.params['job'];
    if (name != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const generateId = () => {
    return Math.floor(Math.random() * MAX_ID).toString();
 }