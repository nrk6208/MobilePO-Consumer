import { OrderLinesModel } from './orderLinesModel';

export interface OrderModel {
    OrderId: number;
    OrderNumber: string;
    Status: string;
    Lines: Array<OrderLinesModel>;
}
