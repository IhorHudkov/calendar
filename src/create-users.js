import User from './models/user';
import Admin from './models/admin';

const namesOfAllUsers = ['Jhon', 'Mila', 'Sam', 'Molly', 'Garry', 'Lisa', 'Mike'];
const allUsers = [];

for (const name of namesOfAllUsers) {
  const isAdmin = Math.floor(Math.random() * 2);
  if (isAdmin) {
    allUsers.push(new Admin(name));
  } else {
    allUsers.push(new User(name));
  }
}

export default allUsers;
