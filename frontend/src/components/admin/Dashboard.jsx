import React, { useEffect, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import SalesChart from "../charts/SalesChart"
import { useLazyGetSalesQuery } from '../../reudx/API/orderApi';
import toast from 'react-hot-toast';
import Loader from "../layouts/Loader"

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const [getSales, { data, error, isLoading, isSuccess }] = useLazyGetSalesQuery();

  useEffect(() => {

    if (error) {
      toast.error(error?.data?.message)
    }
    if (startDate && endDate && !data) {
      // submitHandle()
      getSales({ startDate: new Date(startDate).toISOString(), endDate: endDate.toISOString() })
    }

  }, [error])

  const submitHandle = (e) => {
    e.preventDefault();
    getSales({ startDate: new Date(startDate).toISOString(), endDate: endDate.toISOString() })
  }

  if (isLoading) {
    return <Loader />
  }

  console.log("data", data);

  return (
    <AdminLayout>
      <div class="d-flex justify-content-start align-items-center m-5">
        <div class="mb-3 me-4">
          <label class="form-label d-block">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            class="form-control"
          />
          {/* <input type="date" class="form-control" /> */}
        </div>
        <div class="mb-3">
          <label class="form-label d-block">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            class="form-control"
          />
          {/* <input type="date" class="form-control" /> */}
        </div>
        <button class="btn btn-primary fetch-btn ms-4 mt-3 px-5" onClick={submitHandle}>Fetch</button>
      </div>

      <div class="row pr-4 my-5">
        <div class="col-xl-6 col-sm-12 mb-3">
          <div class="card text-white bg-success o-hidden h-100">
            <div class="card-body">
              <div class="text-center card-font-size">
                Sales
                <br />
                <b>${data?.totalSales}</b>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-sm-12 mb-3">
          <div class="card text-white bg-danger o-hidden h-100">
            <div class="card-body">
              <div class="text-center card-font-size">
                Orders
                <br />
                <b>{data?.totalNumOrders}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      {data?.salesData && <SalesChart salesData={data?.salesData} />}
      <div class="mb-5"></div>

    </AdminLayout>

  )
}

export default Dashboard