import { gql } from '@apollo/client';

export const mutateCustomerDataQuery = gql`
    mutation MUTATE_CUSTOMER_DATA($name: String!, $industry: String!) {
        createCustomer(name: $name, industry: $industry) {
            customer {
                id
                name
            }
        }
    }
`;

export const fetchCustomerDataQuery = gql`
    {
        customers {
            id
            name
            industry
            orders {
                id
                description
                totalInCents
            }
        }
    }
`;

export const mutateCustomerOrderDataQuery = gql`
    mutation MUTATE_CUSTOMER_ORDER_DATA($description: String!, $totalInCents: Int!, $customer: ID) {
        createOrder(description: $description, totalInCents: $totalInCents, customer: $customer) {
            order {
                id
                customer {
                    id
                }
                description
                totalInCents
            }
        }
    }
`;
