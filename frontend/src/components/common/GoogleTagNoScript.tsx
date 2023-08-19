import { GOOGLE_TAG_MANAGER_ID } from '@/libs/envValues';

const GoogleTagNoScript = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              />`,
    }}
  />
);

export default GoogleTagNoScript;
