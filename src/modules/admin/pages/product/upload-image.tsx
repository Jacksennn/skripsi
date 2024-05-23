import { useUploadImage } from "@/api/common";
import Button from "@/components/elements/button";
import { GetProp, Upload, UploadFile, UploadProps, message } from "antd";
import React, { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export default function ImageUpload() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const { mutateAsync } = useUploadImage();
  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file as FileType);
    });
    formData.append("contentType", "image/jpg");
    setUploading(true);
    try {
      const res = await mutateAsync(formData as any);
      message.success("upload successfully.");
    } catch (e) {
      message.error("upload failed.");
    }
    setUploading(false);
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<Upload />}>Select File</Button>
      </Upload>
      <Button
        variant="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
}
