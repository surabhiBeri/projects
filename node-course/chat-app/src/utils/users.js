const users=[]

const addUser=({username,id,room})=>{
    
    //Validate the data
    if(!username || !room){
        return {
            error:'User Name and Room are required!'
        }
    }

    //Format the data
    username=username.trim().toLowerCase();
    room=room.trim().toLowerCase();

    //Check for existing User
    const existingUser=users.find((user)=>{
        return user.username === username && user.room === room;
    })

    //Validate username
    if(existingUser){
        return {
            error:'User Name is in use!'
        }
    }

    //Store the user
    const user={username,room,id}
    users.push(user)
    return {user}
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>{
        return user.id === id
    })

    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser=(id)=>{
    return users.find((user)=> user.id === id)
}

const getUsersInRoom=(room)=>{
    room=room.trim().toLowerCase();
    return users.filter((user)=> user.room === room)
}

module.exports={
    addUser,
    getUser,
    getUsersInRoom,
    removeUser
}