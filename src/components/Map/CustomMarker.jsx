// src/components/CustomMarker.jsx
const CustomMarker = ({ number }) => {
    const style = {
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
    };
  
    return <div style={style}>{number}</div>;
  };
  
  export default CustomMarker;
  