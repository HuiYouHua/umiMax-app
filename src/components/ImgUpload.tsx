import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';
const AV = require('leancloud-storage/live-query');

import getBase64 from '@/utils/base64';

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ImageUpload: React.FC = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(props.imgurl ?? '');

  // const handleChange: UploadProps['onChange'] = (
  //   info: UploadChangeParam<UploadFile>,
  // ) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       console.log(url);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  const customUpload = (info) => {
    setLoading(true);
    getBase64(info.file, (url) => {
      setLoading(false);
      const data = { base64: url };
      const fileName = new Date().getTime() + info.file.name;
      const avfile = new AV.File(fileName, data);
      avfile.save().then((res) => {
        const url = res.attributes.url;
        console.log(url);
        setImageUrl(url);
        props.onChange(url); // 将图片链接传给父级
      });
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={customUpload}
        beforeUpload={beforeUpload}
        // onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImageUpload;
