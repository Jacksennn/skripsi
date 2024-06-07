import { useUploadImage } from "@/api/common";
import Button from "@/components/elements/button";
import { GetProp, Upload, UploadFile, UploadProps, message } from "antd";
import React, { useState } from "react";
import {
  Control,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface Props {
  name: string;
  control: Control<any>;
}
export default function ImageUpload(props: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const { mutateAsync } = useUploadImage();
  const { field } = useController({
    control: props.control,
    name: props.name,
  });

  const handleUpload = async (file: UploadFile<any>) => {
    const formData = new FormData();
    formData.append("file", file as FileType);
    setUploading(true);
    try {
      const res = await mutateAsync(formData as any);
      field.onChange([
        ...field.value,
        {
          name: res.file_name,
          // url: res.file_url,
        },
      ]);
      message.success("upload successfully.");
    } catch (e) {
      message.error("upload failed.");
    }
    setUploading(false);
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    onChange: async ({ file }) => {
      if (file.status === "removed") {
        return;
      }
      await handleUpload(file);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...uploadProps} listType="picture-card">
        <Button icon={<Upload />}>Select File</Button>
      </Upload>
    </>
  );
}
