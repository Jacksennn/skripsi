import Layout from "@/components/widget/layout";
import React from "react";
import { checkoutstyles } from "./styles.css";
import { getBucket, resetBucket } from "./helpers";
import Text from "@/components/elements/text";
import SummaryImageCard from "./summary-image";
import { Col, Divider, Flex, Row, message } from "antd";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  SectionContainerForm,
  SectionForm,
} from "@/modules/admin/components/split-two-form";
import Input from "@/components/elements/input";
import RegionInput from "@/modules/components/region-input";
import CityInput from "@/modules/components/city-input";
import { useCreateTransaction, useGetCalculation } from "./api";
import Button from "@/components/elements/button";
import { ArrowRight } from "@phosphor-icons/react";
import { colors } from "@/theming/colors";
import { useRouter } from "next/router";

type Inputs = {
  city: string;
  is_self_pick_up: boolean;
  nama_awal: string;
  nama_akhir: string;
  alamat: string;
  region: string;
  zip_code: string;
  email: string;
  no_telp: string;
  note: string;
  jasa_kirim: string;
  shipping: number;
};

export default function Checkout() {
  const buckets = getBucket();
  const router = useRouter();
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      alamat: "",
      city: "",
      email: "",
      is_self_pick_up: false,
      jasa_kirim: "",
      nama_akhir: "",
      nama_awal: "",
      no_telp: "",
      note: "",
      region: "",
      shipping: 0,
      zip_code: "",
    },
  });
  const { mutateAsync, isLoading: isCreating } = useCreateTransaction();

  const [regionId, isSelfPickUp, city] = useWatch({
    name: ["region", "is_self_pick_up", "city"],
    control: control,
  });

  const {
    data: calculation,
    isLoading,
    isRefetching,
  } = useGetCalculation(
    {
      carts:
        buckets.findIndex(({ id }) => id === "buy-now") !== -1
          ? []
          : buckets?.map((item) => item.id),
      city: city,
      is_self_pick_up: isSelfPickUp,

      id_produk: buckets?.[0]?.produk?.id,
      jumlah_produk: buckets?.[0]?.jumlah_produk,
    },
    !!city,
    (data) => {
      setValue("shipping", data.shipping);
      setValue("jasa_kirim", data?.jasa_kirim);
    },
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!city) {
      return message.error(
        "Please select your city so we can count your shipping fee",
      );
    }
    try {
      const res = await mutateAsync(
        buckets.findIndex(({ id }) => id === "buy-now") !== -1
          ? {
              ...data,
              carts: [],
              id_produk: buckets?.[0]?.produk?.id,
              jumlah_produk: buckets?.[0]?.jumlah_produk,
            }
          : {
              ...data,
              carts: buckets?.map((item) => item.id),
            },
      );
      window.open(res?.invoice_url);
      message.success(res?.message);

      resetBucket();
      reset();

      router.push("/order-history");
    } catch (e: any) {
      message.error(e?.message);
    }
  };

  return (
    <Layout>
      <div className={checkoutstyles.container}>
        <div className={checkoutstyles.leftContainer}>
          <Text variant="bodyLarge" weight="semiBold" className="mb">
            Billing Information
          </Text>

          <Text variant="bodySmall">User name</Text>
          <SectionContainerForm>
            <SectionForm>
              <Input control={control} name="nama_awal" type="text" />
            </SectionForm>
            <SectionForm>
              <Input
                control={control}
                name="nama_akhir"
                type="text"
                label={""}
              />
            </SectionForm>
          </SectionContainerForm>
          <Input
            control={control}
            name="alamat"
            type="text"
            label={"Address"}
            style={{ width: "100%" }}
          />
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <RegionInput control={control} name="region" type="user" />
            </Col>
            <Col span={12}>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <CityInput
                    control={control}
                    name="city"
                    provinceId={regionId}
                    type="user"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    type="text"
                    label="Zip Code"
                    name="zip_code"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <SectionContainerForm>
            <SectionForm>
              <Input
                type="email"
                label="Email"
                name="email"
                required
                control={control}
                noAsterisk
              />
            </SectionForm>
            <SectionForm>
              <Input
                type="tel"
                label="Phone Number"
                name="no_telp"
                required
                control={control}
                noAsterisk
              />
            </SectionForm>
          </SectionContainerForm>
          <SectionForm>
            <Input
              type="checkbox"
              name="is_self_pick_up"
              control={control}
              label="Self pick-up"
            />
          </SectionForm>
          <div className="mb"></div>
          <div className="mb"></div>
          <Text variant="bodyLarge" weight="semiBold" className="mb">
            Additional Information
          </Text>
          <Text variant="bodySmall">
            Order Notes{" "}
            <span style={{ color: colors.gray500 }}>(Optional)</span>
          </Text>

          <Input
            type="textarea"
            label=""
            name="note"
            required
            control={control}
            noAsterisk
          />
        </div>
        <div className={checkoutstyles.rightContainer}>
          <div className={checkoutstyles.summaryCard}>
            <Text variant="bodyLarge" weight="semiBold">
              Order Summary
            </Text>
            {!!buckets?.length &&
              buckets?.map((bucket) => (
                <SummaryImageCard
                  url={bucket.produk.file.foto_url}
                  name={bucket.produk.nama_produk}
                  price={bucket.produk.harga_produk}
                  qty={bucket.jumlah_produk}
                  key={bucket.id}
                />
              ))}
            <Flex justify="space-between" gap={20}>
              <Text variant="bodySmall" color="gray600">
                Sub-total
              </Text>
              <Text variant="bodySmall">{`Rp. ${
                calculation?.data?.sub_total || 0
              }`}</Text>
            </Flex>
            <Flex justify="space-between" gap={20}>
              <Text variant="bodySmall" color="gray600">
                Shipping
              </Text>
              <Text variant="bodySmall">{`Rp. ${
                calculation?.data?.shipping || 0
              }`}</Text>
            </Flex>

            <>
              {!isSelfPickUp && (
                <Text variant="bodySmall" color="gray600">
                  {`Delivery / Shipping Service : ${
                    calculation?.data.jasa_kirim || "-"
                  }`}
                </Text>
              )}
            </>
            <div>
              <Divider />
              <Flex justify="space-between" gap={20}>
                <Text variant="bodyMedium" weight="semiBold">
                  Total
                </Text>
                <Text variant="bodySmall">{`Rp. ${
                  calculation?.data?.total || 0
                }`}</Text>
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
              disabled={isLoading || isRefetching}
              onClick={handleSubmit(onSubmit)}
              loading={isCreating}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
