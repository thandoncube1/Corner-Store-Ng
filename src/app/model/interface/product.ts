export interface IProduct {
    productId: number;
    productSku: string;
    productName: string;
    productPrice: number;
    productShortName: string;
    productDescription: string;
    createdDate: string;
    deliveryTimeSpan: string;
    categoryId: number;
    productImageUrl: string;
    categoryName: string;
}

export interface IProductById {
    message: string;
    result: boolean;
    data: IProduct;
}

export interface IProducts {
    message: string;
    result: boolean;
    data: Array<IProduct>;
}