export interface OrderLinesModel {
    OrderLineId: number;
    OrderLineNumber: number;
    Quantity: number;
    ShippedQuantity: number;
    DeliveredQuantity: number;
    Status: string;
    showDetails: boolean;
    icon: string;
}
