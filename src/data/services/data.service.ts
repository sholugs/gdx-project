import { Injectable } from '@nestjs/common';
import { sheets } from '../../googleApi/auth';

@Injectable()
export class DataService {
  public async readData() {
    async function getData() {
      const sheet = await sheets();
      const res = await sheet.spreadsheets.values.get({
        spreadsheetId: '1kXZvRQWZuPuVvJzuKqpkzxa1iFNqYxGRM1RHTyWczmk',
        range: 'A:D',
      });

      const rows = res.data.values;
      return rows;
    }

    return getData().then((rows) => rows);
  }
}
