import { useState } from "react";
import axios from "axios";
import "../../App.css";

function Report() {
  const [amount, setAmount] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [reports, setReports] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://dentaldriversteam.herokuapp.com/api/v1/reports",
        { clientName: "Moj zubar", dateFrom, dateTo }
      );
      if (response.data) {
        console.log(response.data);
        let count = 0;
        for (let i = 0; i < response.data.length; i++) {
          count += response.data[i].amount;
        }
        setAmount(count);
        setDateFrom("");
        setDateTo("");
        setReports(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dateFrom">From</label>
        <input
          type="date"
          id="dateFrom"
          onChange={(e) => setDateFrom(e.target.value)}
          value={dateFrom}
          required
        />

        <label htmlFor="dateTo">To</label>
        <input
          type="date"
          id="dateTo"
          onChange={(e) => setDateTo(e.target.value)}
          value={dateTo}
          required
        />
        <button className="btn">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>From</th>
            <th>To</th>
            <th>Direct</th>
            <th>Paid</th>
            <th>Bill date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {reports &&
            reports.map((report, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>{report.nameClientFrom}</th>
                  <th>{report.nameClientTo}</th>
                  <th>{report.direct}</th>
                  <th>{report.paid}</th>
                  <th>{report.dateBill}</th>
                  <th>{report.amount}</th>
                </tr>
              );
            })}
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <button className="btn">to PDF</button>
            </th>
            <th>Total amount</th>
            <th>{amount}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Report;
