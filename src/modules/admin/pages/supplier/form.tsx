import React from "react";
import AdminModal from "../../components/admin-modal";
import Button from "@/components/elements/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SupplierInput, useCreateSupplier } from "./api";
import { Col, Row, notification } from "antd";
import Input from "@/components/elements/input";
type Inputs = SupplierInput;

export default function Form() {
  const { handleSubmit, control } = useForm<Inputs>();
  const { mutateAsync } = useCreateSupplier();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await mutateAsync(data);
      notification.success({ message: res?.message });
    } catch (e: any) {
      notification.error({ message: e?.message });
      throw e;
    }
  };

  return (
    <AdminModal
      title="ADD NEW SUPPLIERS"
      target={(showModal) => (
        <Button variant="primary" onClick={showModal}>
          ADD NEW
        </Button>
      )}
      onSave={handleSubmit(onSubmit)}
    >
      {() => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Input
                type="text"
                label="Supplier ID"
                name="no_supplier"
                required
                control={control}
                noAsterisk
              />
            </Col>
            <Col span={12}>
              <Input
                type="text"
                label="Full Name"
                name="nama_supplier"
                required
                control={control}
                noAsterisk
              />
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Input
                type="email"
                label="Email"
                name="email_supplier"
                required
                control={control}
                noAsterisk
              />
            </Col>
            <Col span={12}>
              <Input
                type="tel"
                label="Phone Number"
                name="notelp_supplier"
                required
                control={control}
                noAsterisk
              />
            </Col>
          </Row>
          <Row>
            <Input
              type="text"
              label="Full Address"
              name="alamat_supplier"
              required
              control={control}
              noAsterisk
            />
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Input
                type="text"
                label="Region"
                name="region"
                required
                control={control}
                noAsterisk
              />
            </Col>
            <Col span={12}>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Input
                    type="text"
                    label="City"
                    name="city"
                    required
                    control={control}
                    noAsterisk
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
        </form>
      )}
    </AdminModal>
  );
}
