import User from './models/user';
import Admin from './models/admin';

const namesOfAllUsers = ['Jhon', 'Mila', 'Sam', 'Molly', 'Garry', 'Lisa', 'Mike'];
const allUsers = [];

for (let i = 0; i < namesOfAllUsers.length; i += 1) {
  if (i < 3) {
    allUsers.push(new Admin(namesOfAllUsers[i]));
  } else {
    allUsers.push(new User(namesOfAllUsers[i]));
  }
}

export default allUsers;
