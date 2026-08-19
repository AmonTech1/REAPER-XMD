// settings.js – Reads from process.env
export const settings = {
    sessionId: process.env.SESSION_ID || "",
    pairingNumber: process.env.PAIRING_NUMBER || "",
    ownerNumber: process.env.OWNER_NUMBER || "",
    botOwner: process.env.BOT_OWNER || "",
    author: process.env.AUTHOR || "",
    botName: process.env.BOT_NAME || "REAPER-XMD",
    packname: process.env.PACKNAME || "REAPER-XMD",
    prefixes: process.env.PREFIXES || ".",
    commandMode: process.env.COMMAND_MODE || "private",
    timezone: process.env.TIMEZONE || "Africa/Nairobi",
    mongoUrl: process.env.MONGO_URL || "",
    postgresUrl: process.env.POSTGRES_URL || "",
    mysqlUrl: process.env.MYSQL_URL || "",
    dbUrl: process.env.DB_URL || "", // for SQLite
    removeBgKey: process.env.REMOVEBG_KEY || "",
    port: process.env.PORT || 3000,
};

export default settings;
