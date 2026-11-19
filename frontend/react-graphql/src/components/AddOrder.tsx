import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { fetchCustomerDataQuery, mutateCustomerOrderDataQuery } from "../queries";

export type AppProps = {
	customerId: number
};

export default function AddOrder ({customerId}: AppProps) {
	const [active, setActive] = useState(false);
	const [description, setDescription] = useState<string>('');
	const [total, setTotal] = useState<number>(NaN);

	const [
		createOrder,
		{
			loading,
			error,
			data,
		},
	] = useMutation(mutateCustomerOrderDataQuery, {
		refetchQueries: [
			{ query: fetchCustomerDataQuery }
		],
	});

	const resetForm = () => {
		setDescription('');
		setTotal(NaN);
		setActive(false);
	}

	useEffect(() => {
		if(data) {
			resetForm();
		}
	}, [data])

	return (
		<div>
			{
				active && (
					<>
					<form style={{border: '1px solid', padding: '20px', marginBottom: '20px'}}
						onSubmit={(e) => {
							e.preventDefault();
							createOrder({
								variables: {
									customer: customerId,
									description: description,
									totalInCents: total*100
								}
							})
						}}>	
						<h3 style={{marginTop: 0}}>Add new order</h3>
						<div>
							<label htmlFor="description">Description: </label>
							<input id="description" type="text" value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							/>
						</div>
						<br/>
						<div>
							<label htmlFor="total">Total: </label>
							<input id="total" type="number" value={!isNaN(total) ? total : ''}
								onChange={(e) => {
									setTotal(parseFloat(e.target.value));
								}}/>
						</div>
						<br/>
						<div style={{display: 'flex', gap: 10}}>
							<button type="submit" disabled={loading}>Add Order</button>
							<button type="reset" disabled={loading} onClick={resetForm}>Cancel</button>
						</div>
					</form>
					{ error && <p>Something went wrong...</p> }
					{ loading && <p>Adding results...</p> }
					</>
				)    
			}
			{
				!active && <button onClick={() => setActive(true)}>+ new order</button>
			}
		</div>
		
	);
}
