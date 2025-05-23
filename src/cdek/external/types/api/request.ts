import type {
  Contact,
  Location,
  Money,
  Package,
  Seller,
  Service,
  Threshold,
} from './base';
import type { UpdateType } from './webhook';

export type OAuth = {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
};

export type GetRegions = {
  country_codes?: string[];
  region_code?: number;
  kladr_region_code?: string;
  fias_region_guid?: string;
  size?: number;
  page?: number;
  lang?: string;
};

export type AddWebhook = {
  url: string;
  type: UpdateType;
};

export type AddOrder = {
  type?: number;
  additional_order_types?: (4 | 6 | 7)[];
  number?: string;
  tariff_code: number;
  comment?: string;
  developer_key?: string;
  shipment_point?: string;
  delivery_point?: string;
  date_invoice?: string;
  shipper_name?: string;
  shipper_address?: string;
  delivery_recipient_cost?: Money;
  delivery_recipient_cost_adv?: Threshold[];
  sender?: Contact;
  seller?: Seller;
  recipient: Contact;
  from_location?: Location;
  to_location?: Location;
  services?: Service[];
  packages: Package[];
  print?: string;
  is_client_return?: boolean;
};

export type UpdateOrder = {
  uuid?: string;
  cdek_number?: number;
  tariff_code?: number;
  comment?: string;
  shipment_point?: string;
  delivery_point?: string;
  delivery_recipient_cost?: Money;
  delivery_recipient_cost_adv?: Threshold[];
  sender?: Contact;
  seller?: Seller;
  recipient?: Contact;
  to_location?: Location;
  from_location?: Location;
  services?: Service[];
  packages?: Package[];
};

export type AddCourier = {
  cdek_number?: number;
  order_uuid?: string;
  intake_date: string;
  intake_time_from: string;
  intake_time_to: string;
  lunch_time_from?: string;
  lunch_time_to?: string;
  name?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  comment?: string;
  sender?: Contact;
  from_location?: Location;
  need_call?: boolean;
  courier_power_of_attorney?: boolean;
  courier_identity_card?: boolean;
};

export type CreateOrderReceipt = {
  orders: {
    order_uuid?: string;
    cdek_number?: number;
  }[];
  copy_count?: number;
  type?: string;
};

export type CreateBarcodeCP = {
  orders: {
    order_uuid?: string;
    cdek_number?: number;
  }[];
  copy_count?: number;
  format?: 'A4' | 'A5' | 'A6';
};

export type AddDeliveryAppointment = {
  cdek_number?: string;
  order_uuid?: string;
  date: string;
  time_from?: string;
  time_to?: string;
  comment?: string;
  delivery_point?: string;
  to_location?: Location;
};

export type AddPrealert = {
  planned_date: string;
  shipment_point: string;
  orders: {
    order_uuid?: string;
    cdek_number?: number;
    im_number?: string;
  }[];
};

export type GetPassportData = {
  order_uuid?: string[];
  cdek_number?: number[];
  client?: string;
};

export type GetCashboxCheck = {
  order_uuid?: string;
  cdek_number?: number;
  date?: string;
};

export type GetCashOnDeliveryRegistry = {
  date: string;
};

export type GetCashOnDeliveryTransfer = {
  date: string;
};

export type GetPickupPoints = {
  postal_code?: number;
  city_code?: number;
  type?: string;
  country_code?: string;
  region_code?: number;
  have_cashless?: boolean;
  have_cash?: boolean;
  allowed_cod?: boolean;
  is_dressing_room?: boolean;
  weight_max?: number;
  weight_min?: number;
  lang?: string;
  take_only?: boolean;
  is_handout?: boolean;
  is_reception?: boolean;
  fias_guid?: string;
};

export type GetCities = {
  country_codes?: string[];
  region_code?: number;
  kladr_region_code?: string;
  fias_region_guid?: string;
  kladr_code?: string;
  fias_guid?: string;
  postal_code?: string;
  code?: number;
  city?: string;
  size?: number;
  page?: number;
  lang?: string;
  payment_limit?: number;
};

export type CalculatorByTariff = {
  date?: string;
  type?: number;
  currency?: number;
  tariff_code: number;
  from_location: Location;
  to_location: Location;
  services?: Service[];
  packages: {
    weight: number;
    length?: number;
    width?: number;
    height?: number;
  }[];
};

export type CalculatorByAvaibleTariffs = {
  date?: string;
  type?: number;
  currency?: number;
  lang?: 'rus' | 'eng' | 'zho';
  from_location: Location;
  to_location: Location;
  services?: Service[];
  packages: {
    weight: number;
    length?: number;
    width?: number;
    height?: number;
  }[];
};

export type CalculatorCustoms = {
  weight: number;
  cost: number;
};

export type GetFinishedOrders = {
  period_begin?: string;
  period_end?: string;
  orders?: {
    order_uuid?: string;
    cdek_number?: number;
  };
};

export type CreateClientReturn = {
  order_uuid: string;
  tariff_code: number;
};
