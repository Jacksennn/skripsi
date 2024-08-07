import { useRouter } from "next/router";
import React from "react";
import { useGetProduct, useGetProductSuggest } from "./api";
import Layout from "@/components/widget/layout";
import Text from "@/components/elements/text";
import { ProductRespondType } from "@/modules/admin/pages/product/api";
import { Carousel, Divider, Flex, Image, Spin, message } from "antd";
import { detailStyle } from "./styles.css";
import NumberControlInput from "../../components/number-control-input";
import Button from "@/components/elements/button";
import CartIcon from "@/components/icon/cart-icon";
import { useAddCart } from "../../cart/api";
import ImageCard from "@/modules/components/image-card";
import { formatPricing } from "@/common/price";
import ProductSearch from "../../product-search";
import { setCheckoutBucket } from "../../checkout/helpers";

export default function MainDetail() {
  const {
    query: { id },
  } = useRouter();

  const { data: respond, isLoading } = useGetProduct(
    {
      id: id as string,
    },
    {
      enabled: !!id,
      onError(err: any) {
        message.error(err?.message);
      },
    },
  );
  const { data: suggest } = useGetProductSuggest(
    {
      id: id as string,
    },
    { enabled: !!id },
  );
  const data = (respond?.data || {}) as ProductRespondType;
  const [val, setVal] = React.useState<number>(1);
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
  const router = useRouter();
  const onbuynow = async () => {
    await setCheckoutBucket([
      {
        jumlah_produk: val,
        sub_total: val * Number(data.harga_produk),
        produk: {
          ...data,
          harga_produk: Number(data.harga_produk),
          file: data?.files[0],
        },
        id: "buy-now",
      },
    ]);
    router.push("/checkout");
  };

  return (
    <Layout searchComponent={<ProductSearch />}>
      {isLoading && <Spin fullscreen />}
      <div className={detailStyle.container}>
        <div style={{ width: 400, height: 500 }}>
          <Carousel autoplay arrows>
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
          </Carousel>
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

                <Flex style={{ marginBottom: 8 }} gap={2}>
                  <Text variant="bodySmall" weight="regular">
                    Stok:
                  </Text>
                  <Text variant="bodySmall" weight="bold">
                    {data!.stok_produk || "-"}
                  </Text>
                </Flex>
                <Flex style={{ marginBottom: 8 }} gap={2}>
                  <Text variant="bodySmall" weight="regular">
                    Satuan:
                  </Text>
                  <Text variant="bodySmall" weight="bold">
                    {data!.satuan || "-"}
                  </Text>
                </Flex>
              </div>
              <Flex gap={2}>
                <Text variant="bodySmall" weight="regular">
                  Kategori:
                </Text>
                <Text variant="bodySmall" weight="bold">
                  {data!.kategori?.nama_kategori || "-"}
                </Text>
              </Flex>
            </>
            <div style={{ marginTop: 16 }}></div>
            <Flex justify="space-between" gap={16}>
              <div>
                <Text color="gray600" variant="bodySmall">
                  Harga:
                </Text>
                <Text color="secondary500" variant="heading03">
                  {formatPricing.format(Number(data!.harga_produk) || 0)},-
                </Text>
              </div>
            </Flex>
            <Divider />
            <Text variant="bodyMedium" weight="bold">
              Deskripsi
            </Text>
            <Text variant="bodySmall" style={{ textAlign: "justify" }}>
              {data.ket_produk}
            </Text>
          </div>
          {/* ACTION */}
          <div className={detailStyle.button}>
            <NumberControlInput
              value={val}
              onChange={(val) => {
                setVal(val);
                if (val > data?.stok_produk) {
                  message.error("Stok produk tidak mencukupi");
                  setVal(data?.stok_produk);
                }
              }}
              max={data.stok_produk}
            />
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
              Tambah ke Keranjang
            </Button>
            <Button
              iconPosition="end"
              variant="secondary"
              className={detailStyle.buyNowButton}
              onClick={onbuynow}
            >
              Beli Sekarang
            </Button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20 }} className={detailStyle.container}>
        {suggest?.data?.map((item) => (
          <div key={item.id} className={detailStyle.cardContainer}>
            <Text
              variant="bodyLarge"
              color="danger500"
              weight="semiBold"
              className={detailStyle.cardTitle}
            >
              Beli kombinasi produk berikut untuk mendapatkan diskon!
            </Text>
            <div className={detailStyle.flexItemContainer}>
              <>
                {item.combinations?.map((combi, index) => (
                  <React.Fragment key={item.id + combi.id}>
                    <ImageCard
                      classname={detailStyle.card}
                      src={combi.produk.file.foto_url}
                      price={Number(combi.produk.harga_produk)}
                      title={combi.produk.nama_produk}
                      discountPrice={Number(combi.harga_produk)}
                      onClick={() => router.push(`/${combi.produk.id}`)}
                    />
                    {!index && "+"}
                  </React.Fragment>
                ))}
              </>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
