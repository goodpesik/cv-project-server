import { Injectable, NestMiddleware } from "@nestjs/common";
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';

const config = () => {
    return {
      type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };
  };
  
  @Injectable()
  export class PreauthMiddleware implements NestMiddleware {
    private defaultApp: firebase.app.App;
  
    constructor() {
        const clientConfig = config();
        this.defaultApp = firebase.initializeApp(
          {
            credential: firebase.credential.cert(clientConfig),
          },
        );
    }
  
    use(req: Request, res: Response, next: (error?: any) => void) {
      const token = req.headers.authorization;
  
      if (token && token !== '') {
        if (token.includes('Bearer ')) {
          this.defaultApp
            .auth()
            .verifyIdToken(token.replace('Bearer ', ''))
            .then(async (decodedToken) => {
              const user = {
                email: decodedToken.email,
              };

              res['user'] = user;
              next();
            })
            .catch((error) => {
              console.error(error);
              if (error.errorInfo?.code === 'auth/id-token-expired') {
                this.unauthorized(req.url, res);
              } else {
                this.accessDenied(req.url, res);
              }
            });
        } else {
          if (token === process.env.API_KEY) {
            next();
          } else {
            this.accessDenied(req.url, res);
          }
        }
      }  else {
        this.accessDenied(req.url, res);
      }
    }
  
    private accessDenied(url: string, res: Response) {
      res.status(403).json({
        statusCode: 403,
        timestamp: new Date().toISOString(),
        path: url,
        message: 'Access Denied',
      });
    }
  
    private unauthorized(url: string, res: Response) {
      res.status(401).json({
        statusCode: 401,
        timestamp: new Date().toISOString(),
        path: url,
        message: 'Unauthorized',
      });
    }
  }