import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    }
    catch (error: any) {
        console.error("Error encrypting:", error.message);
        throw error;
    }
};

export async function validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (err: any) {
      // Handle any error that might occur during password validation
      console.error("Error validating:", err.message);
      throw err;
    }
};