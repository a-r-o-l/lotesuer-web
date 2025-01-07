import { Schema, Document, model, models } from "mongoose";

export interface IPercent {
  quiniela: number;
  loto: number;
  quini6: number;
  brinco: number;
  loto5: number;
  poceada: number;
  express: number;
  telebingo: number;
  telekino: number;
}

export interface ISeller extends Document {
  _id: string;
  sellerNumber: string;
  machineNumber: string;
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  address: string;
  machineRent: number;
  percent: IPercent;
}

export type PartialPercent = Partial<IPercent>;
export type PartialSeller = Partial<ISeller>;

const PercentSchema = new Schema<IPercent>(
  {
    quiniela: { type: Number, default: 11 },
    loto: { type: Number, default: 10 },
    quini6: { type: Number, default: 10 },
    brinco: { type: Number, default: 10 },
    loto5: { type: Number, default: 10 },
    poceada: { type: Number, default: 10 },
    express: { type: Number, default: 8 },
    telebingo: { type: Number, default: 12 },
    telekino: { type: Number, default: 10 },
  },
  {
    timestamps: false,
    versionKey: false,
    _id: false,
    id: false,
  }
);

const SellerSchema: Schema = new Schema(
  {
    sellerNumber: { type: String, required: true },
    machineNumber: { type: String },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    dni: { type: String },
    phone: { type: String },
    address: { type: String },
    machineRent: { type: Number, default: 3 },
    percent: { type: PercentSchema },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const SellerModel = models.Seller || model<ISeller>("Seller", SellerSchema);
export default SellerModel;
