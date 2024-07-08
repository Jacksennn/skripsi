import React, { PropsWithChildren, useState } from "react";
import { Button, Modal } from "antd";
import Text from "@/components/elements/text";
import { typography } from "@/theming/typography";
import { colors } from "@/theming/colors";

interface Props {
  target: (show: () => void) => React.ReactNode;
  title: string;
  children: (close: () => void) => React.ReactNode;
  onSave: () => void;
}

export default function AdminModal(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await props.onSave();
      setIsModalOpen(false);
    } catch (e) {}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {props.target(showModal)}
      <Modal
        title={
          <Text variant="heading05" weight="semiBold">
            {props.title}
          </Text>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Simpan"
        cancelButtonProps={{
          style: {
            borderRadius: 2,
            textTransform: "uppercase",
            ...typography.heading05,
            fontWeight: 500,
          },
        }}
        okButtonProps={{
          style: {
            border: "none",
            textTransform: "uppercase",
            borderRadius: 2,
            ...typography.heading05,
            fontWeight: 500,
            backgroundColor: colors.secondary800,
          },
        }}
        styles={{
          content: {
            padding: 0,
          },
          header: {
            borderBottom: `1px solid ${colors.gray100}`,
            padding: "16px 24px",
            marginBottom: 0,
          },
          body: {
            padding: 24,
          },
          footer: {
            marginTop: 0,
            padding: "0px 24px 24px",
          },
        }}
      >
        {isModalOpen && props.children?.(handleCancel)}
      </Modal>
    </>
  );
}
