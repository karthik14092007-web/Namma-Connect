// server/test_server.js
const http = require("http");
require("./index.js");

setTimeout(() => {
  http.get("http://localhost:5000/api/health", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.log("Health API Response:", data);

      http.get("http://localhost:5000/api/demo/kavya", (res2) => {
        let data2 = "";
        res2.on("data", (chunk) => (data2 += chunk));
        res2.on("end", () => {
          console.log("Demo API Response OK! Growth Score:", JSON.parse(data2).founder.growthScore);
          process.exit(0);
        });
      });
    });
  }).on("error", (err) => {
    console.error("Test failed:", err.message);
    process.exit(1);
  });
}, 1000);
