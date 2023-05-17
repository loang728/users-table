import { useState, useEffect } from 'react';

//Email Validation
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

/* Checks if authentication details are ready to be submited in order to enable button continue */

function proceed(email, firstname, lastname) {
  return (isValidEmail(email) && firstname != "" && lastname != "");
}



const Modal = (props) => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [go, setGo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const recs = props.records;

  function DeleteRecord(id) {
    recs.splice(id, 1);
    alert("deleted");
  }

  function AddRecord(item) {
    recs.push(item);
    props.change(recs);
    setShowModal(false);
  }

  /* sets success state , to clean email and pass and display sucess message on next render */
  const confirmSuccesss = (e) => {

    setSuccess(true);
    e.preventDefault();
    let newRecord = {};


    newRecord = { "id": 75, "first_name": firstName, "last_name": lastName, "email": email, "role": true, "status": true }
    AddRecord(newRecord);

    props.change(recs);
    setShowModal(false);


  }

  if (!props.show) { return null }
  return (
    <>
      <div className="modal">
        <div className='modal-content' onClick={e => e.stopPropagation()}>
          <form id="basic_profile">
            <h1>Invite New User</h1>
            <div class="row">
              <div className='col'><label id="first-name">* First Name</label>
                <input className="form-control"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="first-name"
                  required />
              </div>
              <div className='col'>
                <label id="first-name">* Last Name</label>
                <input className="form-control"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="last-name"
                  required />

              </div>
            </div>
            <div className="row">
              <div className='col'>
                <label id="email">* Email</label>
                <input className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  required />

                <button className={proceed(email, firstName, lastName) ? "btn small blue" : "btn small disabled"} id="btnsubmit" type="submit" disabled={!proceed(email, firstName, lastName)} onClick={confirmSuccesss}>Continue</button>
              </div>

              { /* Checks if email is a valid email adress */
                (email.length > 0) ? (isValidEmail(email)) ? "Valid Email" : <div id="emailerr" className="error red">
                  Please enter a valid email address</div> : null
              }
            </div>
          </form>
        </div>

        <button className="ico close" onClick={props.onClose}> + </button>
      </div>

    </>
  );
}
export default Modal