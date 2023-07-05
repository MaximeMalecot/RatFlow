export const SDK_LINKS = {
    FRONT:
        import.meta.env.VITE_SDK_LINK_FRONT ??
        "https://www.npmjs.com/package/ratflow-sdk-lib-front",
    REACT:
        import.meta.env.VITE_SDK_LINK_REACT ??
        "https://www.npmjs.com/package/ratflow-sdk-react-rollup",
    BACK:
        import.meta.env.VITE_SDK_LINK_BACK ??
        "https://www.npmjs.com/package/ratflow-sdk-lib-back",
    EXPRESS:
        import.meta.env.VITE_SDK_LINK_EXPRESS ??
        "https://www.npmjs.com/package/ratflow-sdk-express",
    NESTJS_MS:
        import.meta.env.VITE_SDK_LINK_NESTJS_MS ??
        "https://www.npmjs.com/package/ratflow-sdk-nest-ms",
};
