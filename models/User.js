import bcrypt from 'bcrypt'
import prisma from '../prisma.js'

export async function registrationUser({fio, birthday, role, profiles: {email, password}}){ 
    const hashedPassword = await bcrypt.hash(password, 10)
  
    try{
        const user = await prisma.users.create({
        data:{
            fio: fio,
            birthday: new Date(birthday),
            status: true,
            role: role,
            profiles: {
                create: {
                  email: email,
                  password: hashedPassword
                },
            },
        },
            include: { profiles: true}
        });
        return true;
    }
    catch (e) {
      console.log(e);  
      return e
    }
};


export async function geUserForName(username){
    const user = await prisma.users.findFirst({
      where: {
        profiles: {
          some: {email: username}
        }
      },
      include: {profiles: true}
      
    });
    if (user == 'null'){
      return false
    }
    else{
      return user
    }
};


export async function getUsers(){
  const users = await prisma.users.findMany({ 
    include: {
      profiles: {
        select: {
          id: true,
          user_id: true,
          email: true
        }
      }
    }
  });
  if (users){
    return users
  }
  else{
    return users.code
  }
}


export async function getUser(user_id){
  const users = await prisma.users.findUnique({ 
    where: {user_id: +user_id},
      include: {
        profiles: {
          select: {
            id: true,
            user_id: true,
            email: true
          }
        }
      }
  });
  if (users){
    return users
  }
  else{
    return null
  }
}

export async function blockUser(user_id, status) {
  const user = await getUser(user_id);
  if (user.code == null | typeof user.code == undefined){
    const userUpdate = await prisma.users.update({
      where:{ user_id: user_id},
      data: {status},
      include: {
        profiles: {
          select: {
            user_id: true,
            email: true, 
          }
        }
      }
    });
    console.log(user)
    return userUpdate;
  }
}