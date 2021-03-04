export default class CalendarEvent {
  constructor(event) {
    this._event = event;
  }

  _postOptions() {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{\"data\": \"${JSON.stringify(this._event).replace(/"/g, '\\"')}\"}`
    };
  }

  static async getAllEvents() {
    const response = await fetch('http://158.101.166.74:8080/api/data/ihor_hudkov/events');
    const result = await response.json();
    return result;
  }

  static async getEventByDayTime(dayTime) {
    return CalendarEvent.getAllEvents()
      .then(
        (result) => {
          let desiredEvent;
          for (const event of result) {
            if ((JSON.parse(event.data)).dayTime === dayTime) {
              desiredEvent = event;
              break;
            }
          }

          return desiredEvent;
        }
      );
  }

  async createEvent() {
    const allEvents = await CalendarEvent.getAllEvents();

    if (allEvents) {
      for (const event of allEvents) {
        if ((JSON.parse(event.data)).dayTime === this._event.dayTime) throw new Error('Failed to create an event. Time slot is already booked.');
      }
    }

    const response = await fetch('http://158.101.166.74:8080/api/data/ihor_hudkov/events', this._postOptions());
    const result = await response.json();
    return result;
  }

  static async deleteEvent(id) {
    const response = await fetch(`http://158.101.166.74:8080/api/data/ihor_hudkov/events/${id}`, { method: 'DELETE' });
    return response.ok;
  }

  static async updateEvent(id, data) {
    const response = await fetch(`http://158.101.166.74:8080/api/data/ihor_hudkov/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{\"data\": \"${JSON.stringify(data).replace(/"/g, '\\"')}\"}`
    });

    return response.ok;
  }
}
