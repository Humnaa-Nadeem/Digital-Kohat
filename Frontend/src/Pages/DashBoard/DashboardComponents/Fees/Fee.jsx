import "./Fee.css";
import "../DashboardComponents.css";
import { FaPen, FaTrash } from "react-icons/fa";
import { useState } from "react";

export const FeeStructure = () => {
    let [showAdderForm, setShowAdderForm] = useState(false);
    let [rowsData, setRowsData] = useState([{
        Class: 1,
        MonthlyFee: 700,
        AnnualFee: 6000,
        AdmissionFee: 1000
    }]);
    let [newRowdta, setNewRowDta] = useState({
        Class: "",
        MonthlyFee: "",
        AnnualFee: "",
        AdmissionFee: ""
    });
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
    }

    const edtTheRow = (rowObj) => {
        setNewRowDta(rowObj);
    }

    return (
        <>
            <section className="form-area Dshbrdfee-Sec">
                <h2>Fee Structure</h2>
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
                    NewRowDataGettingFun(rowsData, setRowsData, newRowdta, setNewRowDta)
                    :
                    <></>
                }
                <div className="form-actions">
                    <button className="save-btn" onClick={() => { console.log("Table Data = ", rowsData) }}>Save</button>
                </div>
            </section>
        </>
    )
}

const NewRowDataGettingFun = (rowsData, setRowsData, newRowdta, setNewRowDta) => {

    const handleNewRowDataChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setNewRowDta({ ...newRowdta, [name]: value })
    }

    const updateRows = () => {
        setRowsData([...rowsData, newRowdta]);
        setNewRowDta({
            Class: "",
            MonthlyFee: "",
            AnnualFee: "",
            AdmissionFee: ""
        });
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
                <button className="AddFeeDtaBtn" onClick={updateRows}>
                    Add
                </button>
            </div>
        </div>
    )
}