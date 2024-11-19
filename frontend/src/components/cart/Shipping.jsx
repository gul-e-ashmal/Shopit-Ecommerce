import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../reudx/features/cartSlice';
import { countries } from "countries-list";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {

    const countryList = Object.values(countries);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNo, setPhoneNo] = useState();
    const [postalCode, setPostalCode] = useState();

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    useEffect(() => {
        if (shippingInfo) {
            setAddress(shippingInfo.address);
            setCity(shippingInfo.city);
            setCountry(shippingInfo.country);
            setPhoneNo(shippingInfo.phoneNo);
            setPostalCode(shippingInfo.postalCode);
        }

    }, [shippingInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, country, phoneNo, postalCode }));
        // toast.success("Shipping info save");
        navigate("/confirm_order");
    }

    return (
        <div className='row wrapper mb-5'>
            <CheckoutSteps shipping />
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    action="your_submit_url_here"
                    method="post"
                >
                    <h2 className="mb-4">Shipping Info</h2>

                    <div className="mb-3">
                        <label for="address_field" className="form-label">Address</label>
                        <input
                            type="text"
                            id="address_field"
                            className="form-control"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label for="city_field" className="form-label">City</label>
                        <input
                            type="text"
                            id="city_field"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label for="phone_field" className="form-label">Phone No</label>
                        <input
                            type="tel"
                            id="phone_field"
                            className="form-control"
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label for="postal_code_field" className="form-label"
                        >Postal Code</label>
                        <input
                            type="number"
                            id="postal_code_field"
                            className="form-control"
                            name="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </div>


                    <div className="mb-3">
                        <label for="country_field" className="form-label">Country</label>
                        <select
                            id="country_field"
                            className="form-select"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        >
                            {countryList?.map((item) => <option key={item.name} value={item?.name}>{item.name}</option>)}
                            <option value="Country2">Country2</option>
                        </select>
                    </div>

                    <button id="shipping_btn" type="submit" className="btn w-100 py-2" onClick={handleSubmit}>
                        CONTINUE
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Shipping