import User from './user';

export default class Admin extends User {
  constructor(name) {
    super(name);
    this._role = 'admin';
  }
}
