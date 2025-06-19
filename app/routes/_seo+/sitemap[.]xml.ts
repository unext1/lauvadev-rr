import { generateSitemap } from '@nasa-gcn/remix-seo';
import { getDomainUrl } from '~/utils/url';
import type { Route } from './+types/sitemap[.]xml';
//  @ts-expect-error Virtual modules are not recognized by TypeScript
import { routes } from 'virtual:react-router/server-build';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const sitemapResponse = await generateSitemap(request, routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      'Cache-Control': `public, max-age=${60 * 5}`
    }
  });

  const sitemapString = await sitemapResponse.text();

  const fixedSitemap = sitemapString.replace(/([^:])\/\//g, '$1/');

  return new Response(fixedSitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      'Cache-Control': `public, max-age=${60 * 5}`,
      encoding: 'UTF-8'
    }
  });
};
