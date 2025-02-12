import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  // let [uname,setuname]=useState('');
  // let [pass,setpass]=useState('');

  // let showcon=()=>{
  //     alert(`${uname} and ${pass}`);
  // }

  let [formdata, setformdata] = useState(
    {
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''
    }
  )

  let [userdata, setuserdata] = useState([]);

  let getValue = (event) => {
    let olddata = { ...formdata }
    let inpname = event.target.name;
    let inputvalue = event.target.value;
    olddata[inpname] = inputvalue;
    setformdata(olddata);

  }

  let handlesubmit = (event) => {

    let currentuerdata = {
      uname: formdata.uname,
      uemail: formdata.uemail,
      uphone: formdata.uphone,
      umessage: formdata.umessage
    }

    if(formdata.index==="")
    {
      let checkFilterData = userdata.filter((v) => v.uemail == formdata.uemail || v.uphone == formdata.uphone)
      if (checkFilterData.length == 1) {
        toast.error("email or phone already exist")
      }
      else {
  
        let olduserdata = [...userdata, currentuerdata];
        setuserdata(olduserdata);
  
  
        setformdata(
          {
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          }
        )
        toast.success("added")
      }
    }
    else{
      let editindex=formdata.index;
      let olddata=userdata;
      let checkFilterData = userdata.filter((v,i) =>
      (v.uemail == formdata.uemail || 
      v.uphone == formdata.uphone) && (i!=editindex))
      // alert(checkFilterData.length)
      if (checkFilterData.length == 0) {
        olddata[editindex]['uname']=formdata.uname;
        olddata[editindex]['uemail']=formdata.uemail;
        olddata[editindex]['uphone']=formdata.uphone;
        olddata[editindex]['umessage']=formdata.umessage;
        toast("updated");
        setformdata(
          {
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          }
        )
      }
      else {
        toast.error("email or phone already exist")
    }
    }
    event.preventDefault();
  }

  let delbtn = (index) => {
    // alert(index)
    let FilterData = userdata.filter((v, i) => i != index)
    setuserdata(FilterData);
    toast("deleted row");
  }

  let updtbtn = (index) => {
    // alert(index);

    let FilterData = userdata.filter((v, i) => i === index)
    setformdata(
      {
        uname: FilterData[0].uname,
        uemail: FilterData[0].uemail,
        uphone: FilterData[0].uphone,
        umessage: FilterData[0].umessage,
        index: index
      }
    )
  }


  return (
    <div className="App">
      <div className='container'>
        <div className='row'>


          <form onSubmit={handlesubmit}>
          <h1>Data Management System</h1>
            <div className='text-start'>
              <label className='form-label'>UserName</label>
              <input type='text' onChange={getValue} value={formdata.uname} name='uname' className='form-control' required />
            </div>

            <div className='text-start'>
              <label className='form-label'>Email</label>
              <input type='text' onChange={getValue} value={formdata.uemail} name='uemail' className='form-control' required />
            </div>

            <div className='text-start'>
              <label className='form-label'>Phone</label>
              <input type='text' onChange={getValue} value={formdata.uphone} name='uphone' className='form-control' required />
            </div>

            <div className='text-start my-3'>
              <label className='form-label'>Message</label>
              <textarea name='umessage' onChange={getValue} value={formdata.umessage} className='form-control' required />
            </div>

            <div className='text-start my-3'>
              <Button type='submit' className='btn1'>{formdata.index !== "" ? 'Update' : 'Save'}</Button>
              <ToastContainer />
            </div>

          </form>
          <Table striped bordered hover className='table'>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                userdata.length >= 1 ?

                  userdata.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umessage}</td>
                        <td>
                          <button onClick={() => delbtn(i)}>Delete</button>
                          <button onClick={() => updtbtn(i)}>Edit</button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan={6}> No data found</td>
                  </tr>
              }


            </tbody>
          </Table>

        </div>
      </div>
    </div>
  );
}

export default App;
