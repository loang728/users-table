
import './Table.css';
import { useState, useEffect } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Modal from "./Modal"


function Table(props) {

  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allRecords, setAllRecords] = useState(props.content);
  // No of Records to be displayed on each page   
  const [recordsPerPage, setRecordsPerPage] = useState(10);


  //Pagination variables
  const nPages = Math.ceil(allRecords.length / recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allRecords.slice(indexOfFirstRecord,
    indexOfLastRecord);

  function handleStateAllRecords(updatedRecords) {
    setAllRecords(updatedRecords);
    setShowModal(false);
  }

  function DeleteRecord(id) {
    const recs = allRecords;
    recs.splice(id, 1);
    setAllRecords(recs);
  }

  function ChangeRecord(id, newStatus) {
    const recs = allRecords;
    recs[id].status = newStatus;
    setAllRecords(recs);
  }

  function AddRecord(item) {
    let recs = allRecords;
    recs.push(item);
    setAllRecords(recs);
    alert("The record has been added");
  }



  function RecordsCount() {

    return (<div className='page-browse'>
      <label for="cars">Records on page</label>

      <select onChange={(e) => setRecordsPerPage(e.target.value)} value={recordsPerPage}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
    )
  }



  function Pagination({ nPages, currentPage }) {
    const pages = [];
    for (let i = 1; i < nPages + 1; i++) {
      pages.push(<li className={(i == currentPage) ? "current" : null}>{i}</li>)
    }
    return (
      <div className='pagination'>
        <a onClick={prevPage}>Previous</a>
        <ul className="page-numbers">
          {pages}
        </ul>
        <a onClick={nextPage}>Next</a>
      </div>
    )
  }

  function TableRow(props) {
    const [enabled, setEnabled] = useState(props.item.status);
    const [display, setDisplay] = useState(true);

    function Switcher() {
      return (<div className={enabled ? 'switcher' : 'switcher off'} onClick={() => setEnabled(enabled ? false : true)}> <span class="ico switcher-circle" >.</span></div>

      )
    }

    function changeId(id) {
      props.change(id)
    }



    return (
      <tr className={enabled ? "" : "disabled"}>
        <td><span className="ico profile">.</span></td>
        <td><span>{props.item.first_name + " " + props.item.last_name}</span> {props.item.email}</td>
        <td><span class='ico key'>.</span>{(props.item.role) ? "admin" : "user"}</td>
        <td><Switcher on={enabled} /></td>
        <td class="settings"><Link to="/setup" onClick={() => changeId(props.item.last_name)} ><span class="ico bin" >.</span></Link><span class="ico bin" onClick={() => { AddRecord(props.item) }} >.</span></td>
      </tr>
    )

  }

  const nextPage = () => {
    if (currentPage !== nPages)
      setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }

  // User is currently on this page


  return (<>
    <h2></h2>

    <table >
      <thead><th>&nbsp;</th><th>User</th><th>Role</th><th>Status</th><th>Actions</th></thead>
      <tbody>
        {currentRecords.map((item) => (< TableRow item={item} />))}
      </tbody>
    </table>
    <div class="operations">
      <RecordsCount />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
    <button className='circle' onClick={() => setShowModal(true)}>+</button>
    <Modal onClose={() => setShowModal(false)} show={showModal} change={handleStateAllRecords} records={allRecords} />
  </>
  );

}
export default Table
