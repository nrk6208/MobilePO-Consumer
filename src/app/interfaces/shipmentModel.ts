export interface ShipmentModel {
    OrderNumber: string;
    // OrderLineNumber: number;
    Quantity: number;
    InvoiceNumber: string;
    LorryNumber: string;
    GateEntryNumber: string;
    Date: Date;
    OrderId: number;
    // OrderLineId: number;
    ShipmentId: number;
    Lines: Array<ShipmentLineModel>;
}
export interface ShipmentLineModel {
    OrderLineId: number;
    OrderLineNumber: number;
    Quantity: number;
    ShipmentLineId: number;
    Date: Date;
    showDetails: boolean;
    icon: string;
}

