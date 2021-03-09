import { restClient } from './client';

export default class CalendarEvent {
  static async getEventByDayTime(dayTime) {
    return restClient.getAll('events')
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
}
