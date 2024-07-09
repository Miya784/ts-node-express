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

export const comparePassword = async (password : string, hash : string) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
    catch (error: any) {
        console.error("Error comparing:", error.message);
        throw error;
    }
}