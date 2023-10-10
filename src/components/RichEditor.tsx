import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useEffect, useState } from 'react';
const AV = require('leancloud-storage/live-query');

import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import getBase64 from '@/utils/base64';

type InsertFnType = (url: string, alt: string, href: string) => void;

export default function RichEditor(props) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState();

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    // toolbarKeys: ['headerSelect', 'bold'],
    excludeKeys: ['insertImage', 'group-video', 'insertTable', 'codeBlock'],
  }; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {},
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    // if (editor !== null) {
    //   const toolbar = DomEditor.getToolbar(editor);

    //   const curToolbarConfig = toolbar?.getConfig();
    //   console.log(curToolbarConfig?.toolbarKeys); // 当前菜单排序和分组
    // }
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // 失焦回调
  editorConfig.onBlur = (editor: IDomEditor) => {
    // console.log(editor.getHtml());
    props.onChange(editor.getHtml());
  };

  editorConfig.onChange = (editor: IDomEditor) => {
    // TS 语法
    console.log(editor.getHtml());
    props.onChange(editor.getHtml());
  };

  // 自定义上传图片
  editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传
    async customUpload(file: File, insertFn: InsertFnType) {
      // file 即选中的文件
      getBase64(file, (url) => {
        const data = { base64: url };
        const fileName = new Date().getTime() + file.name;
        const avfile = new AV.File(fileName, data);
        avfile.save().then((res) => {
          const url = res.attributes.url;
          insertFn(url, '图片', url);
        });
      });
    },
  };

  return (
    <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        // onChange={(editor) => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: '300px', overflowY: 'hidden' }}
      />
    </div>
  );
}
