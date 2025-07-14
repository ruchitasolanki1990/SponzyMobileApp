import { store } from '../redux/store';
import { logout, clearAllData as clearUserAuthData } from '../redux/slices/userAuthSlice';
import { clearAllData as clearSignupData } from '../redux/slices/signupSlice';
import { persistor } from '../redux/store';
import tokenStorage from './tokenStorage';

/**
 * Comprehensive logout utility that clears all Redux data and persistent storage
 */
export const performLogout = async () => {
  try {
    console.log('Starting comprehensive logout...');
    
    // 1. Clear all Redux state
    store.dispatch(logout());
    store.dispatch(clearUserAuthData());
    store.dispatch(clearSignupData());
    
    // 2. Clear persistent storage
    await persistor.purge();
    
    // 3. Clear token storage
    await tokenStorage.clearAuthData();
    
    console.log('Logout completed successfully - all data cleared');
    
    // Verify logout was successful
    const verificationResult = verifyLogoutComplete();
    if (!verificationResult) {
      console.warn('Logout verification failed - some data may still persist');
    }
    
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

/**
 * Logout with API call (for server-side logout)
 */
export const performLogoutWithAPI = async (token: string, userId: string, apiUrl: string) => {
  try {
    console.log('Starting logout with API call...');
    
    // 1. Call logout API
    const response = await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const responseData = await response.json();
    console.log('Logout API Response:', responseData);
    
    // 2. Clear all local data regardless of API response
    await performLogout();
    
    return responseData;
  } catch (error) {
    console.error('Error during logout with API:', error);
    
    // Even if API call fails, clear local data
    await performLogout();
    
    throw error;
  }
};

/**
 * Verify that all Redux data has been cleared
 */
export const verifyLogoutComplete = () => {
  const state = store.getState();
  
  // Check userAuth state
  const userAuthCleared = !state.userAuth.isAuthenticated && 
                         !state.userAuth.token && 
                         !state.userAuth.user;
  
  // Check signup state
  const signupCleared = !state.signup.loading && 
                       !state.signup.success && 
                       !state.signup.error && 
                       !state.signup.userData;
  
  // Check token storage
  const tokenStorageCleared = !tokenStorage.getToken() && !tokenStorage.getUser();
  
  const allCleared = userAuthCleared && signupCleared && tokenStorageCleared;
  
  console.log('Logout verification:', {
    userAuthCleared,
    signupCleared,
    tokenStorageCleared,
    allCleared
  });
  
  return allCleared;
}; 