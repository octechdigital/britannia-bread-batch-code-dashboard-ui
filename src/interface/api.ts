export interface BaseResponse {
  status: number;
  message: string;
}

export interface GenericRecord {
  [key: string]: string | number | boolean | ((props: any) => JSX.Element);
}

export interface LoginResponse extends BaseResponse {
  data: {
    token: string;
  };
}

export interface DashboardCountResponse extends BaseResponse {
  data: GenericRecord[];
  title: string;
}

export interface GetAnyDataResponse extends BaseResponse {
  data: {
    userList: GenericRecord[];
  };
}
export interface GetUserDataResponse extends BaseResponse {
  data: GenericRecord;
}

export interface GetRejectReasonResponse extends BaseResponse {
  data: GenericRecord[];
}

// export interface SendCreateCampaignData {}
