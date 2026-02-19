import { generateRobotsTxt } from '@nasa-gcn/remix-seo';
import { getDomainUrl } from '~/utils/url';
import type { Route } from './+types/robots[.]txt';

export const loader = ({ request }: Route.LoaderArgs) => {
  return generateRobotsTxt(
    [
      {
        type: 'sitemap',
        value: `${getDomainUrl(request)}/sitemap.xml`,
      },
    ],
    {
      headers: {
        'Cache-Control': `public, max-age=${60 * 5}`,
      },
    },
  );
};
