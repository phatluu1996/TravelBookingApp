import React, { useEffect, useRef } from 'react'

const Paypal = () => {
    const paypal = useRef();
    
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent : "CAPTURE",
                    purchase_units: [{
                        description : "Testing booking function",
                        amount : {
                            currency : "USD",
                            value : 1.00
                        }
                    }]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])

    return (
        <>
            <div ref={paypal}></div>
        </>
    )
}

export default Paypal
