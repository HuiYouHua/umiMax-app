import { useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';

import { mapAdd, mapGet, mapUpdate } from '@/api/map';

// DOC: https://developer.amap.com/api/javascript-api/reference/overlay#polygon
export default function Area() {
  const mapRef = useRef();
  const mRef = useRef();
  const [drawing, setDrawing] = useState(false);
  let mouseTool;

  const { run: mapAddRun } = useRequest(mapAdd, {
    manual: true,
  });
  const { run: mapUpdateRun } = useRequest(mapUpdate, {
    manual: true,
  });

  useRequest(
    () => {
      return mapGet('上海市');
    },
    {
      onSuccess: (data) => {
        console.log('data', data);
        if (data && data.length > 0) {
          const paths = data.map((item) => item.path);

          const polygon1 = new AMap.Polygon({
            fillColor: 'red',
            fillOpacity: 0.3,
            path: paths,
            draggable: true,
          });

          mRef.current?.add([polygon1]);
          mRef.current?.setFitView();
        }
      },
    },
  );

  const drawPolygon = useCallback(function drawPolygon() {
    setDrawing(true);

    mouseTool.polygon({
      strokeColor: '#FF33FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillColor: '#1791fc',
      fillOpacity: 0.4,
      // 线样式还支持 'dashed'
      strokeStyle: 'solid',
      // strokeStyle是dashed时有效
      // strokeDasharray: [30,10],
    });
  }, []);

  useEffect(() => {
    const map = new AMap.Map(mapRef.current, {
      center: [121.488437, 31.225834],
      zoom: 12,
    });
    mRef.current = map;
    mouseTool = new AMap.MouseTool(map);

    mouseTool.on('draw', function (event) {
      // event.obj 为绘制出来的覆盖物对象
      // log.info('覆盖物对象绘制完成');

      const path = event.obj.getPath();
      let arr = path.map((item) => {
        return [item.lng, item.lat];
      });

      mapAddRun({
        city: '上海市',
        path: arr,
      });

      setDrawing(false);
    });
  }, []);

  return (
    <div>
      <Button type="primary" onClick={drawPolygon} disabled={drawing}>
        {drawing ? '正在绘制' : '开始绘制'}
      </Button>
      <div className={styles.map} ref={mapRef}>
        即将渲染地图...
      </div>
    </div>
  );
}
