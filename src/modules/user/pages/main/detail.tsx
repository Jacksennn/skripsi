import { useRouter } from "next/router";
import React from "react";
import { useGetProduct } from "./api";
import Layout from "@/components/widget/layout";
import Text from "@/components/elements/text";
import { ProductRespondType } from "@/modules/admin/pages/product/api";
import { Carousel, Divider, Flex, Image, Spin, message } from "antd";
import { detailStyle } from "./styles.css";
import NumberControlInput from "../../components/number-control-input";
import Button from "@/components/elements/button";
import CartIcon from "@/components/icon/cart-icon";
import { useAddCart } from "../../cart/api";

export default function MainDetail() {
  const {
    query: { id },
  } = useRouter();

  const { data: respond, isLoading } = useGetProduct(
    {
      id: id as string,
    },
    { enabled: !!id },
  );
  const data = (respond?.data || {}) as ProductRespondType;
  const [val, setVal] = React.useState<number>(0);
  const { mutateAsync, isLoading: isLoadAddCard } = useAddCart();

  const addCard = async () => {
    try {
      const res = await mutateAsync({
        id_produk: id as string,
        jumlah_produk: val,
      });
      message.success(res?.message);
    } catch (e) {
      message.error((e as any)?.message);
    }
  };

  if (!data) {
    return (
      <Flex>
        <Spin />
      </Flex>
    );
  }

  return (
    <Layout>
      <div className={detailStyle.container}>
        <div style={{ width: 400, height: 500 }}>
          {/* <Carousel autoplay> */}
          {data.files?.map((item) => (
            <Image
              width={400}
              height={500}
              style={{
                objectFit: "contain",
              }}
              src={item.foto_url}
              alt={item.foto_produk}
              key={item.foto_url}
            ></Image>
          ))}
          {/* </Carousel> */}
        </div>
        <div>
          {/* TEXT */}
          <div>
            <Text variant="bodyXl" weight="medium" style={{ marginBottom: 24 }}>
              {data?.nama_produk}
            </Text>

            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  maxWidth: "500px",
                }}
              >
                <Flex>
                  <Text variant="bodySmall" weight="regular">
                    Sku:
                  </Text>
                  <Text variant="bodySmall" weight="bold">
                    {data!.sku_produk}
                  </Text>
                </Flex>

                <Flex style={{ marginBottom: 16 }} gap={2}>
                  <Text variant="bodySmall" weight="regular">
                    Stock:
                  </Text>
                  <Text variant="bodySmall" weight="bold">
                    {data!.stok_produk}
                  </Text>
                </Flex>
              </div>
              <Flex gap={2}>
                <Text variant="bodySmall" weight="regular">
                  Category:
                </Text>
                <Text variant="bodySmall" weight="bold">
                  {data!.kategori?.nama_kategori}
                </Text>
              </Flex>
            </>
            <div style={{ marginTop: 16 }}></div>
            <Flex justify="space-between" gap={16}>
              <div>
                <Text color="gray600" variant="bodySmall">
                  Price:
                </Text>
                <Text color="secondary500" variant="heading03">
                  Rp. {data!.harga_produk},-
                </Text>
              </div>
            </Flex>
            <Divider />
            <Text variant="bodyMedium" weight="bold">
              Description
            </Text>
            <Text variant="bodySmall" style={{ textAlign: "justify" }}>
              {data.ket_produk}
            </Text>
          </div>
          {/* ACTION */}
          <div className={detailStyle.button}>
            <NumberControlInput value={val} onChange={setVal} />
            <Button
              icon={<CartIcon size={20} />}
              iconPosition="end"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
              onClick={addCard}
              loading={isLoadAddCard}
            >
              Add to Cart
            </Button>
            <Button
              iconPosition="end"
              variant="secondary"
              className={detailStyle.buyNowButton}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
