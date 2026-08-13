// settings.js – Reads from process.env
export const settings = {
    sessionId: process.env.SESSION_ID || "",
    pairingNumber: process.env.PAIRING_NUMBER || "",
    ownerNumber: process.env.OWNER_NUMBER || "",
    botOwner: process.env.BOT_OWNER || "",
    author: process.env.AUTHOR || "",
    botName: process.env.BOT_NAME || "★彡 [ ℝ𝔼𝔸ℙ𝔼ℝ 𝕏𝕄𝔻 ] 彡★",
    packname: process.env.PACKNAME || "★彡 [ ℝ𝔼𝔸ℙ𝔼ℝ 𝕏𝕄𝔻 ] 彡★",
    prefixes: process.env.PREFIXES || ".",
    commandMode: process.env.COMMAND_MODE || "private",
    timezone: process.env.TIMEZONE || "Africa/Nairobi",
    mongoUrl: process.env.MONGO_URL || "",
    postgresUrl: process.env.POSTGRES_URL || "",
    mysqlUrl: process.env.MYSQL_URL || "",
    dbUrl: process.env.DB_URL || "", // for SQLite
    removeBgKey: process.env.REMOVEBG_KEY || "",
    // Add any missing env vars you need
};
export default settings;
