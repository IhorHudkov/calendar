export default class User {
  constructor(name) {
    this._name = name;
    this._role = 'user';
  }

  get name() {
    return this._name;
  }

  get role() {
    return this._role;
  }
}
