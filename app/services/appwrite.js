import { Account, Client, Databases, ID, Query } from "appwrite";

// Appwrite configuration with embedded variables (for debugging purposes only)
const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1", // Your Appwrite endpoint
  projectId: "672cfc4e003a4709c911",        // Your Appwrite project ID
  databaseId: "672cfccb002f456cb332",       // Your Appwrite database ID
  userCollectionId: "672cfcd0003c114264cd", // Your Appwrite user collection ID
};

// Debugging logs to verify that variables are loaded
console.log("Endpoint:", appwriteConfig.endpoint);
console.log("Project ID:", appwriteConfig.projectId);
console.log("Database ID:", appwriteConfig.databaseId);
console.log("User Collection ID:", appwriteConfig.userCollectionId);

if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
  throw new Error("Appwrite environment variables are not defined.");
}

// Initialize Appwrite client
const client = new Client();
client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const account = new Account(client);
export const databases = new Databases(client);

export async function createUser(email, password, name, role = "admin") {
  try {
    // Step 1: Create the new account
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Account creation failed.");

    // Step 2: Sign in the new user to establish a session
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Failed to create session.");

    // Step 3: Create the user document in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        role, // Set role to 'admin' or 'user' as needed
      }
    );

    // Return the newUser object
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message || "Error creating user");
  }
}

// Function to sign in a user
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (session) {
      const currentAccount = await account.get();
      if (!currentAccount) throw new Error("Unable to retrieve account.");
      return currentAccount; // Return the account if successful
    } else {
      throw new Error("Failed to create session.");
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message || "Error signing in");
  }
}

// Function to get the current account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    if (
      error.message.includes("Missing scope") ||
      error.message.includes("unauthorized")
    ) {
      console.warn("User is not authenticated. Redirect to login or handle session.");
      return null; // Return null if unauthorized
    } else {
      throw new Error(error.message || "Error fetching account");
    }
  }
}

// Function to get the current user document
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount || !currentAccount.$id) {
      throw new Error("No account found.");
    }

    const currentUserResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)] // Ensure 'accountId' is the correct field name
    );

    if (!currentUserResponse || currentUserResponse.total === 0) {
      throw new Error("No user document found.");
    }

    const userDocument = currentUserResponse.documents[0];
    if (!userDocument.role) {
      userDocument.role = "user"; // Default role
    }

    return userDocument;
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return null;
  }
}

// Function to get all users
export async function getAllUsers() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );
    return response.documents;
  } catch (error) {
    throw new Error("Error fetching users");
  }
}

// Function to sign out the current user
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message || "Error signing out");
  }
}
