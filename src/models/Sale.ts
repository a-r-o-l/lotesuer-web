import { Schema, Document, model, models } from "mongoose";

export interface ISale extends Document {
  _id: string;
  date: string;
  quiniela: number;
  loto: number;
  quini6: number;
  brinco: number;
  loto5: number;
  poceada: number;
  express: number;
  premios: number;
  total: number;
  paga: number;
  saldo: number;
  sellerId: number;
}

export type PartialSale = Partial<ISale>;

const SaleSchema: Schema = new Schema(
  {
    date: { type: String, required: true },
    quiniela: { type: Number },
    loto: { type: Number },
    quini6: { type: Number },
    brinco: { type: Number },
    loto5: { type: Number },
    poceada: { type: Number },
    express: { type: Number },
    premios: { type: Number },
    total: { type: Number },
    paga: { type: Number },
    saldo: { type: Number },
    sellerId: { type: String, required: true, ref: "Seller" },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const SaleModel = models.Sale || model<ISale>("Sale", SaleSchema);
export default SaleModel;
