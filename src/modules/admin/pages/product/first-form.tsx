import React from "react";
import {
  ProductInput,
  ProductRespondType,
  useDeleteProduct,
  useEditProduct,
  useGetProduct,
} from "./api";
import FormLayout from "../../components/form-layout";
import { firstFormStyle } from "./styles.css";
import Text from "@/components/elements/text";
import { Flex, Image, Spin, message, notification } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import Button from "@/components/elements/button";
import { useRouter } from "next/router";
import { formatPricing } from "@/common/price";

export default function ProductFirstForm() {
  const [value, setValue] = React.useState<boolean>(false);

  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditProduct();
  const {
    push,
    query: { id },
  } = useRouter();
  const { data: respond, refetch } = useGetProduct(
    {
      id: id as string,
    },
    {
      enabled: !!id,
      onSuccess: (data) => {
        setValue(data.data.visibility);
      },
    },
  );

  const data: ProductRespondType = respond?.data || ({} as ProductRespondType);

  const edit = async () => {
    try {
      const body: ProductInput = {
        ...data,
        id_kategori: data!.kategori.id,
        files: data!.files.map((fie) => ({
          id: fie.id,
          foto_produk: fie.foto_produk,
          urutan: Number(fie.urutan),
        })),
        harga_produk: Number(data!.harga_produk),
        visibility: value,
      };
      const res = await mutateEdit({ id: data!.id, data: body });
      refetch();
      message.success(res?.message);
    } catch (e: any) {
      message.success(e?.message);
    }
  };

  const { mutateAsync, isLoading: isDeleteLoad } = useDeleteProduct();

  const onDelete = async (id: string) => {
    try {
      const res = await mutateAsync({ id });
      push("/admin/product");
      notification.success({ message: res?.message });
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  if (!respond?.data) {
    return (
      <FormLayout>
        <Spin />
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      <div className={firstFormStyle}>
        <div>
          <Image
            alt="product-image"
            src={data!.files?.[0]?.foto_url}
            width={400}
            height={400}
          ></Image>
        </div>
        <div>
          <Text variant="bodyXl" weight="medium" style={{ marginBottom: 24 }}>
            {data!.nama_produk}
          </Text>

          <Flex justify="space-between" gap={16}>
            <Flex>
              <Text variant="bodySmall" weight="regular">
                Sku:
              </Text>
              <Text variant="bodySmall" weight="bold">
                {data!.sku_produk}
              </Text>
            </Flex>
            <div>
              <Flex style={{ marginBottom: 16 }} gap={2}>
                <Text variant="bodySmall" weight="regular">
                  Stock:
                </Text>
                <Text variant="bodySmall" weight="bold">
                  {data!.stok_produk}
                </Text>
              </Flex>
              <Flex gap={2}>
                <Text variant="bodySmall" weight="regular">
                  Category:
                </Text>
                <Text variant="bodySmall" weight="bold">
                  {data!.kategori?.nama_kategori}
                </Text>
              </Flex>
            </div>
          </Flex>
          <div style={{ marginTop: 16 }}></div>
          <Flex justify="space-between" gap={16}>
            <div>
              <Text color="gray600" variant="bodySmall">
                Price:
              </Text>
              <Text color="secondary500" variant="heading03">
                {formatPricing.format(Number(data!.harga_produk || 0))},-
              </Text>
            </div>
            <div>
              <Flex gap={16} align="center">
                <Checkbox
                  value={value}
                  onChange={(e) => setValue(e.target.checked)}
                />
                <Text color="gray700" variant="bodySmall">
                  Product Visibility
                </Text>
              </Flex>
            </div>
          </Flex>

          <Flex gap={16} justify="end" style={{ marginTop: 23 }}>
            <Button
              variant="secondary"
              onClick={() => onDelete(id as string)}
              loading={isDeleteLoad}
            >
              DELETE
            </Button>
            <Button
              variant="secondary"
              onClick={() => edit()}
              loading={isEditing}
            >
              SAVE
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => push(`/admin/product/${data.id}/edit`)}
            >
              {"EDIT"}
            </Button>
          </Flex>
        </div>
      </div>
    </FormLayout>
  );
}
