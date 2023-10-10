// ${projectRoot}/plugin.ts

import { IApi } from '@umijs/max';
export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('head').append([
      `<script type="text/javascript">
        window._AMapSecurityConfig = {
            securityJsCode:${process.env.MAP_SECRET},
        }
</script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=${process.env.MAP_KEY}&plugin=AMap.MouseTool"></script> `,
    ]);
    return $;
  });
};
