import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
import useFetch from "../hooks/useFetch";

export default function Customers() {
    const [show, setShow] = useState(false);

    function toggleShow () {
        setShow(!show);
    }

    const url = baseUrl + 'api/customers/';
    const {request, appendData, data: { customers } = {}, errorStatus} = useFetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    });

    function newCustomer (name, industry) {
        appendData({name, industry});

        if (!errorStatus) {
            toggleShow();
        }
    };

    useEffect(() => {
        request();
    }, []);

    return (
        <>
            <h1>Here are the list of customers:</h1>
            {
                customers ?
                    customers.map(customer => {
                        return (
                            <div className="m-2" key={customer.id}>
                                <Link to={'/customers/'+ customer.id}>
                                    <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                        {customer.name}
                                    </button>
                                </Link>
                            </div>
                        )
                    })
                    : null
            }
            <AddCustomer
                newCustomer={newCustomer}
                show={show}
                toggleShow={toggleShow}
            />
        </>
    );
};