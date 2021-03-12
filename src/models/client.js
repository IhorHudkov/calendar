const Catch = function (target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    const result = originalMethod.apply(this, args);
    return result.catch((error) => {
      console.log('CatchDecorator: ', error.message);
      throw new Error();
    });
  };
  return descriptor;
};

class Client {
  constructor() {
    if (Client.exists) {
      return Client.instance;
    }

    Client.instance = this;
    Client.exists = true;
    this.url = 'http://158.101.166.74:8080/api/data/ihor_hudkov/';
  }

  @Catch
  async getAll(entity) {
    const response = await fetch(`${this.url}${entity}`);
    const result = await response.json();
    return result;
  }

  @Catch
  async create(entity, data) {
    const allRecords = await this.getAll(entity);

    if (allRecords) {
      if (entity === 'events') {
        for (const record of allRecords) {
          if ((JSON.parse(record.data)).dayTime === data.dayTime) throw new Error('Failed to create an event. Time slot is already booked.');
        }
      }

      if (entity === 'users') {
        for (const record of allRecords) {
          if ((JSON.parse(record.data)).name === data.name) throw new Error('Failed to create a user. The user with the same name already exists.');
        }
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{\"data\": \"${JSON.stringify(data).replace(/"/g, '\\"')}\"}`
    };

    const response = await fetch(`${this.url}${entity}`, options);
    const result = await response.json();
    return result;
  }

  @Catch
  async delete(entity, id) {
    const response = await fetch(`${this.url}${entity}/${id}`, { method: 'DELETE' });
    return response.ok;
  }

  @Catch
  async update(entity, id, data) {
    const response = await fetch(`${this.url}${entity}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{\"data\": \"${JSON.stringify(data).replace(/"/g, '\\"')}\"}`
    });

    return response.ok;
  }
}

export const restClient = new Client();
