export type ITempInfo = {
    id: number;
    address: string | null;
    callback_url: string | null;
    city: string | null;
    country_id: number | null;
    created_at: string;
    data: string | null;
    dob: string | null;
    dropoff: string | null;
    email: string | null;
    employee: string | null;
    first_name: string | null;
    gender: string | null;
    hashvalue: string;
    last_name: string | null;
    nric: string | null;
    orderId: string | null;
    orderfor: string | null;
    origin: string | null;
    phone_number: string | null;
    postalcode: string | null;
    sku: string | null;
    redirect_url: string | null;
    state_id: number | null;
    tenure: string | null;
    updated_at: string;
    customer: ICustomer;
    program_type: string | null;
    program_code: string | null;
    program_id: number | null;
    device: IDevice;
    order: IOrder;
    tnc_id: number | null;
    tnc: string | null;
};


export type ICustomer = {
    id: number;
    nric: string;
    name_as_per_nric: string;
    email: string;
    program_id: number;
    address: string;
    city: string;
    postalcode: string;
    state: string;
    delivery_postcode: string;
    delivery_address: string;
    delivery_city: string;
    delivery_state: string;
    delivery_option: string;
    order: IOrder;
};

export type IOrder = {
    id: number;
    sku: string;
    partner_sku: string;
    tenure: number;
    orderId: string;
    pickup_branch: number;
    program: IProgram;
    branch_name: string;
};

export type IBranch = {
    id: string;
    name: string;
    branch_code: string;
};

export type IProgram = {
    id: number;
    program_name: string;
    program_code: string;
    has_house_delivery: boolean;
};

export type IDevice = {
    capacity: string;
    color: string;
    id: number;
    device_cost: string;
    image: string;
    name: string;
    price: string;
    program_fee: string;
    tenure: number;
};

export type IPayloadCreditCheck = {
    nric: string;
    dob: string;
    name: string;
    orderId: number;
    customerId: number;
    retryCount: number;
    netSalary: string;
};
export type IBankItem = {
    code: string[];
    name: string[];
    logo: string[];
    id: string[];
    display_name: string[];
};

export type IOrderConfirmation = {
    message: string;
    url: string | null;
};

export type ApiResponse = {
    status: string;
};

export type CreditCheckResponse = {
    msj: string;
    status: boolean;
    result: string;
};
