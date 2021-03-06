import withPWA from 'next-pwa';
import path from 'path';

import getBuildId from './pwa-utils/getBuildId.js';
import getDynamicPrecacheEntries from './pwa-utils/getDynamicPrecacheEntries.js';
import getStaticPrecacheEntries from './pwa-utils/getStaticPrecacheEntries.js';

export default async (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    reactStrictMode: true,
    i18n: {
      locales: ['ua', 'ru'],
      defaultLocale: 'ua',
      localeDetection: false,
      localePath: path.resolve('./public/locales'),
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
    images: {
      domains: ['3.71.20.14.nip.io'],
    },
    pwa: {
      dest: 'public',
      buildExcludes: [/middleware-manifest\.json$/], // for Next 12, see https://github.com/shadowwalker/next-pwa/issues/288
      fallbacks: {
        image: 'og_logo.jpg',
      },
    },
  };

  if (phase === 'phase-production-build') {
    // Attributes generateBuildId and additionalManifestEntries are only needed
    // for the build and calculating their value is time-consuming.
    // So we add them here, just for the build.

    const buildId = getBuildId();

    config.generateBuildId = getBuildId;
    config.pwa.additionalManifestEntries = [
      ...getStaticPrecacheEntries({
        // exclude icon-related files from the precache since they are platform specific
        // note: no need to pass publicExcludes to next-pwa, it's not used for anything else
        publicExcludes: [
          '!*.png',
          '!*.jpg',
          '!*.ico',
          '!browserconfig.xml',
          '!fonts/**/*',
          '!icons/**/*',
          '!locales/**/*',
        ],
      }),
      ...await getDynamicPrecacheEntries(buildId),
    ];
  }

  return withPWA(config);
};
