import "./Fee.css";
import "../DashboardComponents.css";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { SendFeeTabDataToDb } from "../../../../ApiCalls/DashBoardApiCalls";
import { ToastContainer } from "react-toastify";

export const FeeStructure = ({ dashboardData }) => {
    const [CanSubmitForm, setCanSubmitForm] = useState(false);

    // Decides to show class adder form or not
    let [showAdderForm, setShowAdderForm] = useState(false);

    // Setting the Db Data if any, instead of default data
    let [rowsData, setRowsData] = useState(dashboardData.feeData || [{
        Class: 1,
        MonthlyFee: 700,
        AnnualFee: 6000,
        AdmissionFee: 1000
    }]);

    // New Rows
    let [newRowdta, setNewRowDta] = useState({
        Class: "",
        MonthlyFee: "",
        AnnualFee: "",
        AdmissionFee: ""
    });

    // Arranging class in increasing order like 1 , 2, 3 , ....;
    let sortedArr = [...rowsData].sort((a, b) => Number(a.Class) - Number(b.Class));
    let row = sortedArr.map((rowObj, i) => {
        return (
            <tr key={i}>
                <td>{rowObj.Class}</td>
                <td>{rowObj.MonthlyFee}</td>
                <td>{rowObj.AnnualFee}</td>
                <td>{rowObj.AdmissionFee}</td>
                <td className="actionTd">
                    <button className="delActionTd tdBtns" onClick={() => { delTheRow(rowObj) }}><FaTrash /></button>
                </td>
            </tr>
        )
    });

    const delTheRow = (rowObj) => {
        let updatedArr = rowsData.filter((rows) => rows !== rowObj);
        setRowsData(updatedArr);
        setCanSubmitForm(true);
    }

    const FinalFun = (e) => {
        e.preventDefault();
        SendFeeTabDataToDb(rowsData, setCanSubmitForm);
    }

    return (
        <>
            <section className="form-area Dshbrdfee-Sec">
                {/* To show notification */}
                <ToastContainer />
                <form onSubmit={(e) => FinalFun(e)}>
                    <h2>Fee Structure</h2>
                    <p className="addressingPara">You can remove the class 1 data and can add data that suit you.</p>
                    <table className="feeTable">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Monthly Fee</th>
                                <th>Annual Fee</th>
                                <th>Admission Fee</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>
                    </table>
                    <div className="AddField tableRowAdder" onClick={() => { setShowAdderForm(!showAdderForm) }}>
                        +
                    </div>
                    {(showAdderForm)
                        ?
                        NewRowDataGettingFun(rowsData, setRowsData, newRowdta, setNewRowDta, setCanSubmitForm, setShowAdderForm)
                        :
                        <></>
                    }
                    <div className="form-actions">
                        <button type="submit" disabled={!CanSubmitForm} className="save-btn">Save</button>
                    </div>
                </form>
            </section>
        </>
    )
}


// Creating new row componenet:
const NewRowDataGettingFun = (rowsData, setRowsData, newRowdta, setNewRowDta, setCanSubmitForm, setShowAdderForm) => {

    const handleNewRowDataChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setNewRowDta({ ...newRowdta, [name]: value })
    }

    const updateRows = () => {
        let IsEmptyData;
        Object.entries(newRowdta).map(([key, value]) => {
            if (!newRowdta[key] || newRowdta[key] === "") {
                IsEmptyData = true;
            } else {
                IsEmptyData = false
            }
        });
        if (IsEmptyData) {
            alert("Fill the fields first.")
        } else {
            setRowsData([...rowsData, newRowdta]);
            setNewRowDta({
                Class: "",
                MonthlyFee: "",
                AnnualFee: "",
                AdmissionFee: ""
            });
            setCanSubmitForm(true);
            setShowAdderForm(false);
        }
    }

    return (
        <div className="feeFormCont">
            <div className="adderForm">
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Class</label>
                        <input type="number" name="Class" value={newRowdta.Class} onChange={(e) => handleNewRowDataChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Monthly Fee</label>
                        <input type="number" name="MonthlyFee" value={newRowdta.MonthlyFee} onChange={(e) => handleNewRowDataChange(e)} />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Annual Fee</label>
                        <input type="number" name="AnnualFee" value={newRowdta.AnnualFee} onChange={(e) => handleNewRowDataChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Admission Fee</label>
                        <input type="number" name="AdmissionFee" value={newRowdta.AdmissionFee} onChange={(e) => handleNewRowDataChange(e)} />
                    </div>
                </div>
                <button type="button" className="AddFeeDtaBtn" onClick={updateRows}>
                    Add
                </button>
            </div>
        </div>
    )
}