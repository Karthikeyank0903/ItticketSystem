import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div style={styles.container}>
      <h2>🚫 Not Authorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to Login</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "3rem",
    fontFamily: "Arial, sans-serif"
  }
};

export default NotAuthorized;
