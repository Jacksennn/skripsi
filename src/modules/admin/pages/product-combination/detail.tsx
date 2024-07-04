import React, { useState } from "react";
import {
  useEditProductCombination,
  useGetProductCombination,
  useGetProductCombinationDetail,
} from "./api";
import Modal from "antd/es/modal/Modal";
import { colors } from "@/theming/colors";
import { Card, Flex, Image, Spin, message, notification } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import Text from "@/components/elements/text";
import Input from "@/components/elements/input";
import Button from "@/components/elements/button";
import { queryClient } from "@/common/query-client";
import { formatPricing } from "@/common/price";

interface Props {
  target: (showModal: () => void) => React.ReactNode;
  id: string;
}

export default function ProductCombinationDetail(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = props;
  const { mutateAsync, isLoading: isMutateLoad } = useEditProductCombination();
  const { isLoading, isRefetching, data } = useGetProductCombinationDetail(
    {
      id: id!,
    },
    {
      enabled: isModalOpen && !!id,
      onSuccess(data) {
        data.data.combinations.forEach((item) =>
          setValue(`price.${item.id}`, Number(item.harga_produk)),
        );
        setValue("visibility", data.data.visibility);
      },
    },
  );
  const { handleSubmit, control, setValue, reset } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (values) => {
    try {
      const prices: { id: string; harga_produk: number }[] = [];
      Object.keys(values.price).forEach((key) =>
        prices.push({
          id: key,
          harga_produk: values.price[key],
        }),
      );
      const temp = {
        visibility: values.visibility,
        combinations: prices,
      };

      const res = await mutateAsync({ data: temp, id });
      reset();
      queryClient.refetchQueries(["daftar-produk-kombinasi"]);
      notification.success({ message: res.message });
      setIsModalOpen(false);
    } catch (e: any) {
      notification.success({ message: e?.message });
    }
  };
  return (
    <>
      {props.target(() => setIsModalOpen(true))}
      <Modal
        open={isModalOpen}
        width={800}
        onCancel={() => setIsModalOpen(false)}
        footer={<></>}
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
        {isLoading || isRefetching ? (
          <Flex justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                gap: 20,
              }}
            >
              {data?.data.combinations.map((item, index, arr) => (
                <React.Fragment key={item.id + index}>
                  <Flex gap={20}>
                    <Image
                      alt="example"
                      src={item.produk.file.foto_url}
                      width={150}
                      height={150}
                      style={{ objectFit: "contain" }}
                    />

                    <div>
                      <Text
                        variant="bodyLarge"
                        weight="medium"
                        style={{ fontSize: 20 }}
                      >
                        {item.produk.nama_produk}
                      </Text>
                      <Text variant="bodySmall" color="gray700" weight="medium">
                        Original Price:
                        {formatPricing.format(Number(item.harga_produk))},-
                      </Text>
                      <div className="mb"></div>
                      <Input
                        type="number"
                        name={`price.${item.id}`}
                        control={control}
                        label="Combination Price"
                      ></Input>
                    </div>
                  </Flex>
                  {!index && index !== arr.length && (
                    <Text variant="heading01" color={"danger400"}>
                      +
                    </Text>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Input
              type="checkbox"
              label="Visibility"
              control={control}
              name="visibility"
            />
            <Flex justify="center">
              <Button htmlType="submit" loading={isMutateLoad}>
                Save
              </Button>
            </Flex>
          </form>
        )}
      </Modal>
    </>
  );
}
