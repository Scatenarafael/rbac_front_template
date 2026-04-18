// {
//   "id": "007344da-7edc-44e1-b59a-db887855da0d",
//   "first_name": "john",
//   "last_name": "doe",
//   "email": "john.doe@email.com",
//   "user_tenant_roles": [
//     {
//       "id": "045c0600-b432-4636-af93-a87c67493a97",
//       "tenant": {
//         "id": "3fb90212-dbd4-4720-ab2d-61c106eb3f18",
//         "name": "Loja 1"
//       },
//       "role": {
//         "id": "145b1fdd-9c80-417f-a01d-116db3ac9dd3",
//         "name": "tenantadmin"
//       }
//     },
//     {
//       "id": "4aa9e903-c861-4433-8360-1514d0b44c05",
//       "tenant": {
//         "id": "4fee3e34-e71e-43f6-91eb-5e3f08d3fd38",
//         "name": "Loja 2"
//       },
//       "role": {
//         "id": "c1afa9d7-8705-4e32-a4c8-8c54ca02a454",
//         "name": "member"
//       }
//     }
//   ]
// }


export type UserTenantRolesDetails = {
        id: string;
        tenant: {
            id: string;
            name: string;
        };
        role: {
            id: string;
            name: string;
        };
    }

export interface IProfileProps {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_tenant_roles: UserTenantRolesDetails[];
}