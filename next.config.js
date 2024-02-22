/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import withNextIntl from "next-intl/plugin";

/** @type {import("next").NextConfig} */
const config = {};

export default withNextIntl()(config);
