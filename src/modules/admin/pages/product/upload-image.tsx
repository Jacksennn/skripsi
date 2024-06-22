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

  React.useEffect(() => {
    if (field?.value?.length > fileList.length) {
      setFileList(
        field.value.map((item: any) => ({
          name: item.name,
          url: item.url,
        })),
      );
    }
  }, [field.value, fileList]);

  const handleUpload = async (file: UploadFile<any>) => {
    const formData = new FormData();
    formData.append("file", file as FileType);
    setUploading(true);
    try {
      const res = await mutateAsync(formData as any);
      setFileList((prev) => {
        const currIdx = prev.findIndex((item) => item.name === file.name);
        const temp = [...prev];
        temp[currIdx].url = res.url;
        return temp;
      });
      field.onChange([
        ...field.value,
        {
          name: res.file_name,
          url: res.url,
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
      const newField = [...field.value];
      newFileList.splice(index, 1);
      newField.splice(index, 1);
      field.onChange(newField);
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
    <div className="mb">
      <Upload {...uploadProps} listType="picture-card">
        <Button icon={<Upload />}>Select File</Button>
      </Upload>
    </div>
  );
}
