import { useState } from "react";
import { useMassPrintSales } from "../../transaction/sales/api";
import { DatePicker, Modal, notification } from "antd";
import Text from "@/components/elements/text";
import Button from "@/components/elements/button";
import BaseInput from "@/components/elements/input/base-input";
import { inputStyles } from "@/components/elements/input/styles.css";
import dayjs from "dayjs";

interface Props {
  target: (showModal: () => void) => React.ReactNode;
}

function blobToBase64(blob: any) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default function ExportSalesMass(props: Props) {
  const { mutateAsync: printSales, isLoading } = useMassPrintSales();
  const [date, setDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onPrint = async () => {
    try {
      if (!date) {
        return notification.error({ message: "Masukkan Tanggal" });
      }

      notification.success({
        message: "Sedang membuat pdf, mohon menunggu... ",
      });
      const res = await printSales({
        date: date.toISOString() as any,
      });

      const temp = await blobToBase64(await res.blob());

      const win = window.open();
      win?.document.write(
        `
            <title>PDF</title>
            <body style="padding:0;margin:0;">
            <iframe src="
              ${temp}
              " frameborder="0" style="margin:0; border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allow="fullscreen"></iframe>
            </body>
            `,
      );
    } catch (e: any) {
      notification.error({ message: e?.message });
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {props.target(() => setIsModalOpen(true))}
      <Modal
        title={
          <Text variant="heading04" weight="semiBold">
            Pilih tanggal
          </Text>
        }
        width={800}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText="Simpan"
        footer={[
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
            key="cancel"
            disabled={isLoading}
          >
            Batal
          </Button>,
          <Button
            variant="primary"
            key="submit"
            loading={isLoading}
            onClick={onPrint}
          >
            Selanjutnya
          </Button>,
        ]}
      >
        <Text variant="bodySmall">Pilih Tanggal</Text>
        <DatePicker
          value={dayjs(new Date(date), { utc: false })}
          onChange={setDate as any}
          className={inputStyles}
          size="large"
          allowClear={false}
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
}
