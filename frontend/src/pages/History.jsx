// const [history, setHistory] = useState([]);
// const [loadingHistory, setLoadingHistory] = useState(true);


// useEffect(() => {
//   const fetchHistory = async () => {
//     try {
//       const res = await API.get("/health/history");
//       setHistory(res.data);
//     } catch (err) {
//       console.log("History error:", err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };
//   fetchHistory();
// }, []);

// <div className="card" style={{ marginTop: "30px" }}>
//   <h3>📊 Prediction History</h3>

//   {loadingHistory && <p>Loading history...</p>}

//   {!loadingHistory && history.length === 0 && (
//     <p>No records found</p>
//   )}

//   {!loadingHistory && history.map((item, i) => (
//     <div
//       key={i}
//       style={{
//         padding: "12px",
//         marginTop: "10px",
//         borderRadius: "10px",
//         background: "#0f172a",
//         border: "1px solid #334155"
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <span>
//           {item.prediction === 1 ? "⚠️ High Risk" : "✅ Low Risk"}
//         </span>

//         <span style={{ fontSize: "12px", color: "#94a3b8" }}>
//           {new Date(item.createdAt).toLocaleString()}
//         </span>
//       </div>

//       {/* Optional: show input */}
//       <div style={{ fontSize: "12px", marginTop: "5px", color: "#94a3b8" }}>
//         Age: {item.inputData?.age}, Glucose: {item.inputData?.glucose}
//       </div>
//     </div>
//   ))}
// </div>