
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import AddOrder from '../components/AddOrder';
import { fetchCustomerDataQuery, mutateCustomerDataQuery } from '../queries';

export type Order = {
	id: number;
	description: string;
	totalInCents: number;
}

export type Customer = {
	id: number;
	name: string;
	industry: string;
	orders: [Order];
};

export default function LocalServer() {
	const [name, setName] = useState<string>('');
	const [industry, setIndustry] = useState<string>('');
	const { loading, error, data } = useQuery(fetchCustomerDataQuery);

	const [
		createCustomer,
		{
			loading: createCustomerLoading,
			error: createCustomerError,
			data: createCustomerData,
		},
	] = useMutation(mutateCustomerDataQuery, {
		refetchQueries: [
			{ query: fetchCustomerDataQuery }
		],
	});

	return (
		<>
            <h1>'Customers' from Local GraphQL Server</h1>
			{error ? <p>Unable to fetch customers list</p> : null}
			{loading ? <p>Loading...</p> : null}
			{
				data ? data.customers.map((customer: Customer) => {
					return (
						<div key={customer.id} style={{border: '1px solid', padding: '20px', marginBottom: '20px'}}>
							<h2>
								{customer.name + ' (' + customer.industry + ')'}
							</h2>
							<div>
								{
									customer.orders.length ? 
										<table style={{border: '1px solid', width: '50%', marginBottom: '20px'}}>
											<colgroup>
												<col style={{width: '50%'}}/>
												<col style={{width: '50%'}}/>
											</colgroup>
											<thead>
												<tr style={{background: '#ababab'}}>
													<th style={{textAlign: 'start'}}>Description</th>
													<th style={{textAlign: 'end'}}>Price</th>
												</tr>
											</thead>
											<tbody>
											{						
												customer.orders.map((order: Order) => {
													return (
														<tr key={order.id}>
															<td>{order.description}</td>
															<td style={{textAlign: 'end'}}>${(order.totalInCents/100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
														</tr>
													)
												})
											}
											</tbody>
											<tfoot style={{background: '#dedede'}}>
												<tr style={{fontWeight: 'bold'}}>
													<td>Total</td>
													<td style={{textAlign: 'end'}}>${customer.orders.reduce((sum, order) => sum + (order.totalInCents/100), 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
												</tr>
											</tfoot>
										</table>
									:
									<div style={{border: '1px solid', textAlign: 'center', width: '50%', padding: '10px', marginBottom: '20px'}}>
										No orders have been added
									</div>
								}
								<AddOrder customerId={customer.id}/>
							</div>
						</div>
					);
				}) : null
			}
			<h3>Add a Customer</h3>
			<form style={{border: '1px solid', padding: '20px'}}
				onSubmit={(e) => {
					e.preventDefault();
					createCustomer({
						variables: {
							name: name,
							industry: industry
						},
					});
					if (!error) {
						setName('');
						setIndustry('');
					}
				}}>
				<div>
					<label htmlFor="name">Name: </label>
					<input id="name" type="text" value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<br/>
				<div>
					<label htmlFor="industry">Industry: </label>
					<input id="industry" type="text" value={industry}
						onChange={(e) => {
							setIndustry(e.target.value);
						}}/>
				</div>
				<br/>
				<button disabled={createCustomerLoading}>Add Customer</button>
				{createCustomerError ? <p>Error creating customer</p> : null}
			</form>
		</>
	);
}
