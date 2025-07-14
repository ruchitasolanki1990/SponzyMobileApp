import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthData {
  token: string;
  user: StoredUser;
}

class TokenStorage {
  private static instance: TokenStorage;
  private token: string | null = null;
  private user: StoredUser | null = null;

  private constructor() {}

  static getInstance(): TokenStorage {
    if (!TokenStorage.instance) {
      TokenStorage.instance = new TokenStorage();
    }
    return TokenStorage.instance;
  }

  // Store token and user data in both memory and AsyncStorage
  async storeAuthData(authData: AuthData): Promise<void> {
    try {
      // Store in memory for quick access
      this.token = authData.token;
      this.user = authData.user;

      // Store in AsyncStorage for persistence
      await AsyncStorage.setItem(TOKEN_KEY, authData.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(authData.user));
      
      console.log('Auth data stored successfully');
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  }

  // Get token from memory (fast access)
  getToken(): string | null {
    return this.token;
  }

  // Get user from memory (fast access)
  getUser(): StoredUser | null {
    return this.user;
  }

  // Load token and user from AsyncStorage (for app startup)
  async loadAuthData(): Promise<AuthData | null> {
    try {
      const [token, userString] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY)
      ]);

      if (token && userString) {
        const user = JSON.parse(userString);
        
        // Store in memory
        this.token = token;
        this.user = user;

        return { token, user };
      }
      return null;
    } catch (error) {
      console.error('Error loading auth data:', error);
      return null;
    }
  }

  // Clear token and user data from both memory and AsyncStorage
  async clearAuthData(): Promise<void> {
    try {
      // Clear from memory
      this.token = null;
      this.user = null;

      // Clear from AsyncStorage
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEY),
        AsyncStorage.removeItem(USER_KEY)
      ]);
      
      console.log('Auth data cleared successfully');
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  }

  // Check if user is authenticated (has token in memory)
  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Get auth headers for API requests
  getAuthHeaders(): Record<string, string> {
    if (this.token) {
      return {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }
}

export default TokenStorage.getInstance(); 