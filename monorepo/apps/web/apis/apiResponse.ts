export interface ProviderData {
    providerId: string | null;
    uid: string;
    displayName: string | null;
    email: string;
    phoneNumber: string | null;
    photoURL: string | null;
  }
  
  export interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: string;
  }
  
  export interface FirebaseUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: ProviderData[];
    stsTokenManager: StsTokenManager;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
  }
  
  export interface TokenResponse {
    kind: string;
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string;
  }
  
  export interface FirebaseApiResponse {
    user: FirebaseUser;
    providerId: string | null;
    _tokenResponse: TokenResponse;
    operationType: string;
  }