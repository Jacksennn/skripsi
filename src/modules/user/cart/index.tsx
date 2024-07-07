import Layout from "@/components/widget/layout";
import React from "react";
import { useGetCalculation, useGetCarts, useUpdateCart } from "./api";
import { Checkbox, Divider, Flex, Image, Spin, Table, message } from "antd";
import ImageLiteCard from "../components/image-lite";
import DebounceComponent from "@/components/debounce-component";
import NumberControlInput from "../components/number-control-input";
import { cartStyles } from "./styles.css";
import Text from "@/components/elements/text";
import Button from "@/components/elements/button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { resetBucket, setCheckoutBucket } from "../checkout/helpers";
import { useRouter } from "next/router";
import classNames from "classnames";
import { formatPricing } from "@/common/price";

function NumberInput({
  id,
  init,
  refetch,
  size,
}: {
  id: string;
  init: number;
  refetch: () => void;
  size?: "small" | "large";
}) {
  const [value, setValue] = React.useState<number>(init);
  const { mutateAsync } = useUpdateCart();
  const afterChange = async (val: number) => {
    try {
      const res = await mutateAsync({
        id_produk: id,
        jumlah_produk: val,
      });
      refetch();
      message.success(res?.message);
    } catch (e: any) {
      message.error(e?.message);
    }
  };
  return (
    <DebounceComponent
      value={value}
      setValue={(val) => {
        setValue(val);
        afterChange(val);
      }}
    >
      {(change, setChange) => (
        <NumberControlInput
          value={change as unknown as any}
          onChange={setChange}
          classname={cartStyles.numberInput}
          size={size}
        ></NumberControlInput>
      )}
    </DebounceComponent>
  );
}
export default function Cart() {
  const { data, refetch } = useGetCarts();
  const [selectedRowKey, setSelectedRowKey] = React.useState<string[]>([]);
  const enabled = !!selectedRowKey?.length;
  const {
    data: calculation,
    isLoading,
    isRefetching,
    refetch: refetchCalculation,
  } = useGetCalculation({ carts: selectedRowKey }, enabled);

  const router = useRouter();

  React.useEffect(() => {
    resetBucket();
  }, []);

  return (
    <Layout>
      <div className={cartStyles.container}>
        <div className={cartStyles.leftContainer}>
          <div className={cartStyles.shoppingCardTitle}>
            <Text variant="bodyLarge" weight="semiBold">
              Shopping Card
            </Text>
          </div>
          <div className={cartStyles.tableSmallContainer}>
            {isLoading || isRefetching ? (
              <Flex
                flex={1}
                align="center"
                justify="center"
                style={{ width: "100%", marginTop: 20 }}
              >
                <Spin size={"large"} />
              </Flex>
            ) : (
              <>
                {data?.data.map((cart) => (
                  <div
                    className={classNames(cartStyles.cartItem, "mb")}
                    key={cart.id}
                  >
                    <Flex gap={16}>
                      <Checkbox
                        checked={selectedRowKey.includes(cart.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked)
                            setSelectedRowKey((prev) => [...prev, cart.id]);
                          else
                            setSelectedRowKey((prev) =>
                              prev.filter((item) => item !== cart.id),
                            );
                        }}
                      />
                      <Image
                        alt="example"
                        src={cart.produk.file.foto_url}
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                      />
                      <Flex vertical justify="center" gap={4}>
                        <Text variant="bodySmall" weight="medium">
                          {cart.produk.nama_produk}
                        </Text>
                        <Text
                          variant="bodySmall"
                          weight="regular"
                          color="gray600"
                        >
                          {`${formatPricing.format(cart.produk.harga_produk)}`}
                        </Text>
                        <Flex gap={20}>
                          <div style={{ width: 100 }}>
                            <NumberInput
                              id={cart.id}
                              init={cart.jumlah_produk}
                              size="small"
                              refetch={() => {
                                refetch();
                                if (selectedRowKey.includes(cart.id)) {
                                  refetchCalculation();
                                }
                              }}
                            />
                          </div>
                          <Flex vertical align="flex-end">
                            <Text variant="bodyTiny" weight="regular">
                              Sub Total
                            </Text>
                            <Text
                              variant="bodySmall"
                              weight="regular"
                              color="gray600"
                            >
                              {`${formatPricing.format(
                                cart.produk.harga_produk,
                              )}`}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className={cartStyles.tableContainer}>
            <Table
              virtual
              style={{
                fontSize: 14,
              }}
              rowSelection={{
                selectedRowKeys: selectedRowKey,
                type: "checkbox",
                onChange: (val) => setSelectedRowKey(val as any[]),
              }}
              columns={[
                {
                  title: "Product",
                  dataIndex: "produk",
                  render: (_, record) => (
                    <ImageLiteCard
                      name={record.produk.nama_produk}
                      url={record.produk.file.foto_url}
                    />
                  ),
                },

                {
                  title: "Price",
                  dataIndex: "harga",
                  render: (_, record) =>
                    formatPricing.format(Number(record.produk.harga_produk)),
                },
                {
                  title: "Quantity",
                  dataIndex: "jumlah_produk",
                  width: 200,

                  render: (_, record) => (
                    <NumberInput
                      id={record.id}
                      init={record.jumlah_produk}
                      refetch={() => {
                        refetch();
                        if (selectedRowKey.includes(record.id)) {
                          refetchCalculation();
                        }
                      }}
                    />
                  ),
                },
                {
                  title: "Subtotal",
                  dataIndex: "subtotal",
                  render: (_, record) =>
                    formatPricing.format(Number(record.sub_total)),
                },
              ]}
              dataSource={data?.data}
              rowKey={"id"}
              pagination={false}
            />
          </div>
          <Flex
            flex={1}
            align="center"
            style={{ width: "100%", marginTop: 32 }}
            justify="center"
          >
            <Button
              variant="secondary"
              size="large"
              icon={<ArrowLeft size={24} />}
              iconPosition="start"
              info
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => router.push("/")}
            >
              Return to shop
            </Button>
          </Flex>
        </div>
        <div className={cartStyles.rightContainer}>
          <div className={cartStyles.totalCard}>
            <Text variant="bodyLarge" weight="semiBold">
              Totals
            </Text>

            <Flex justify="space-between" gap={20}>
              <Text variant="bodySmall" color="gray600">
                Sub-total
              </Text>
              <Text variant="bodySmall">{`${formatPricing.format(
                enabled ? calculation?.data?.sub_total || 0 : 0,
              )}`}</Text>
            </Flex>
            <Flex justify="space-between" gap={20}>
              <Text variant="bodySmall" color="gray600">
                Discount
              </Text>
              <Text variant="bodySmall">{`${formatPricing.format(
                enabled ? calculation?.data?.discount || 0 : 0,
              )}`}</Text>
            </Flex>
            <div>
              <Divider />
              <Flex justify="space-between" gap={20}>
                <Text variant="bodyMedium" weight="semiBold">
                  Total
                </Text>
                <Text variant="bodySmall">{`${formatPricing.format(
                  enabled ? calculation?.data?.total || 0 : 0,
                )}`}</Text>
              </Flex>
            </div>
            <Button
              variant="primary"
              size="large"
              icon={<ArrowRight size={24} />}
              iconPosition="end"
              style={{
                width: "100%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
              loading={isLoading || isRefetching}
              onClick={() => {
                if (selectedRowKey.length && data?.data?.length) {
                  setCheckoutBucket(
                    data?.data.filter((item) =>
                      selectedRowKey.includes(item.id),
                    ) || [],
                  );
                  router.push("/checkout");
                } else {
                  message.error("Please select items to checkout");
                }
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
