export const appConstant = {
    db_url:
        process.env.DATABASE_URL ??
        "mongodb://root:password@db/ratflow?authSource=admin&directConnection=true",
    port: process.env.PORT ?? 3000,
};
