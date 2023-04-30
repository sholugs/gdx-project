import { Injectable } from '@nestjs/common';
import { sheets } from '../../googleApi/auth';

@Injectable()
export class DataService {
  public async readData() {
    async function getData() {
      const sheet = await sheets();
      const res = await sheet.spreadsheets.values.get({
        spreadsheetId: '1v3Aj6p47lshEpuAhl1qJJ69SxSYmDWsU0Fk0CB-O0tM',
        range: 'A:D',
      });

      const rows = res.data.values;
      return rows;
    }

    return getData().then((rows) => rows);
  }
}
