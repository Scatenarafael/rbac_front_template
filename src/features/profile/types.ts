
export interface IChangePasswordPayload {
  new_password: string
  re_new_password: string
}

export interface IChangePasswordMutationPayload
  extends IChangePasswordPayload {
  user_id: string
}
