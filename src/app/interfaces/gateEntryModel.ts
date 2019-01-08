import { OrderModel } from './orderModel';

export interface GateEntryModel {
    GateEntryId: string;
    LorryNumber: string;
    ShipmentId: number;
    InvoiceNumber: number;
    ShipmentDate: Date;
    Order: OrderModel;
}
