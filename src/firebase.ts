import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase client
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Setup Google Auth Provider with Workspace Scopes
export const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/calendar.events.readonly");
provider.addScope("https://www.googleapis.com/auth/documents.readonly");

// Keep OAuth access token in client memory (anti-persistency pattern for token security)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // If we have user but no cached token (browser refresh), we guide to sign-in again for fresh token
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  if (isSigningIn) return null;
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("No Google access token returned from pop-up authenticator.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Popup authenticated session error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getCachedToken = () => cachedAccessToken;

export const logOutOwner = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};
