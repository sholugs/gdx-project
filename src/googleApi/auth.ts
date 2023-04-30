import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.client_email,
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBx1b4kQmFa3eu\nLGbqhJvbOavKZl3sZwQp7DezYGT31uj5gwK214bZrnU/bIDhHFPIDZPHASEK1PbP\nUMCd30+R757PH9UkgwQF1/C8llVzVzqVQcn4tMUZTtoN4S1viJ/gMi/JV47HLOAQ\n7TFO9VLrVGDjPdUS+MWC3bbexWtNg1XH2dPycq5SKgn778s+u3zFQQWUGVaNVkSi\nujdi9+c2N18M8S3xPTLMmsV3DFfLaPNyyh+BS7JVOydX9nygZcASs8rPt7TbdG+z\n4viMxFSS4bEO4P3KTNm4PWQnnKxDMv3cFJCDNLVD2/2tuGLCHk2S0qco580ivjuY\ndvLenKV/AgMBAAECggEAN5NgUjHmtSk5Te7WJXSa7qj/qDDrxx1UiGGDKCMBUkOE\n1erJIH934X6zidkorWdecAXU2EJuo5iooJTcaWree1BqD6Vlj+8zfCmOlcfYAhiG\naMBRmM7fqH6A83IdgduBXt+F7Qz7mgw4xyH//lFF0tCEaSgWsDZBD2NfS0z7lWMR\noQbnUBzFehbfMhSRgNNOub1kmZE+JaDvWNGY+wrt3NR2dUccVzOtM0y/1Axi6R9i\nvnJ9Hl2Rp+ozn4hOV9iqQ6FASuU6szDWr+if8YrJXRJnxs2U31JocbE4IuAGQv3g\n+Iwzzte52KX115CRkbUW0dODmJik5P0q2atT7HqeoQKBgQDnbP0R6W41XCxVnx0V\niZhHfGLMMrfMYNE7i0Zu0AuElIEFnAP1MGVgJd8KL+vXLTm3ng5qxW/h71YJkIBK\nhItVVoRUTW6cJb17wSS8xcJJuKQojZwT4cGJr5HZOYAb7QSBPjNgyWUKMtwjfmvH\nMwXKxHOvI0EK7CJ7kLt7hbwA2wKBgQDWWvbLa0wzWfTcgErly0y6T0uIcc8MO3Wo\nsXQV+xb53tx+rneh7AuStMM1B2/yrYQ5TMomJhylAxIfccQhb5oaJ9gGK3qK1spE\ng3NTck8zVTRCl1Chmf6KU2S/qkg9tFIQAXPXQ4rL6Zz+Avl0yvy4Gh7TrsDHlaW4\n2s+2AF4tLQKBgQCaK24P360OmR/jzkLm1Sn//Won1GXDHoBkpWy/Z5M0uGWXYg70\n6U+vlKsYM0Jur28y1nWORYc6QWHUr1H30oKr0B4JtyfHmBC5/7pEk43R5NJfPa9L\nQ2rWGYMU7gxdDjGhE9nQUXohKC6k6pRMOL5UDTlv5BFxgEuce5eaO0Y6XwKBgGv5\nXh+RaMzlH0aDCTc/dOLUVoPgcB8FRHs5B/SaijRLYl4dm/1gXWQE0d/AY0+mv9ft\nKlaVFBC6v0I/mEAPa1yJfXN+KzgMgc6JOGpsRiDhZnW0qtT8MQ+Uekdhiwop7rxJ\nPwTL7PpSLtZ0wRtntG04GxceC9V9OAEplz9iaA3xAoGAEG8A5DLfADUXoRYd5OEg\nPiJpyy4A9C1e0LkxzmqY+uoGXJJ2ujrjVwzeuxobLXIEFkbzmieq5PJfGOSMSe0A\nF7fn6itRYHjqHOts44+tiC50lvPUVFRdgkridYzOpwGirc5KFtfzFOFEMbiYWfDR\nwpvdrl1CdxHHyTgSbMRHBfI=\n-----END PRIVATE KEY-----\n',
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export const sheets = async () => {
  // console.log(process.env.client_email);
  // console.log(process.env.private_key);
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
};
