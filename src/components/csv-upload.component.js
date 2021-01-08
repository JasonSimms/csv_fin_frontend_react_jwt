import React, { Component, useState } from "react";
import CSVReader from 'react-csv-reader';

import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";


function Upload(props) {
  const [message, setMessage] = useState("Grusse");
//   const [transactions, setTransactions] = useState([]);

//   function getTransactionsByUser() {
//     try{

//       console.log('Foo it!', Object.keys(props.user));
//       const userId = props.user._id || "";
//       TransactionService.getTransactionsByUser(userId).then(res => {
//         console.log('RES IS..', res.data);
//         return setTransactions(res.data);
//       })
//     }catch(e){
//       console.error(e);
//       setMessage(JSON.stringify(e));
//     }
//   }

 

  return (
    <div>
      BINGO BONGO: {message};
      <CSVReader onFileLoaded={(data, fileInfo) => setMessage(JSON.stringify(data))} />
     
    </div>
  )

}

export default Upload;