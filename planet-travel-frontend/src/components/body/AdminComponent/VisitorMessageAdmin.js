/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Visitor Messages Home Page - ADMIN                              
                                           
===================================================================*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from "dateformat";

const VisitorMessageAdmin = () => {
  const [allMessage, setAllMessage] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/visitorMessage/read")
      .then((response) => setAllMessage(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <hr />
      <h1 className="text-center">Visitors Messages - ADMIN</h1>
      <hr />
      <br />
      <table className="table table-hover table-striped table-bordered shadow-lg">
        <thead className="thead-dark text-center">
          <tr>
            <th>Visitor Email</th>
            <th>Message Content</th>
            <th>Send Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allMessage.map((message) => {
            return (
              <tr key={message.id}>
                <td>{message.visitor_email}</td>
                <td>{message.visitor_message}</td>
                <td>
                  {dateFormat(
                    message.created_at,
                    "dddd, mmmm dS, yyyy, h:MM:ss TT"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default VisitorMessageAdmin;
