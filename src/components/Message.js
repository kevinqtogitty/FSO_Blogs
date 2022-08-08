const message = ({ message, setMessage }) => {
  const NotificationStyle = {
    color: "black",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  } else {
    return <div style={NotificationStyle}>{message}</div>;
  }
};

export default message;
