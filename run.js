const fetch = require("node-fetch");
const WebSocketClient = require("websocket").client;

const SEEDS = [
  "wss://seed.nimiqpool.com:22001/e31f6928121400d6f5f2b2a02e3b99c95bdaef71afe910ddf8deee45eed066a0",
  "wss://seed.nimiq.by:8443/c4df959f0f44f971fae2c487b65d6c8eee4aae691e7fd21ffe4e746e6774f92e",
  "wss://urp.best:8443/230ff3860e5f75113758f7b6aa3774863ff116c3435efd2c69e8d7b45192296d",
  "wss://nimiq.icemining.ca:8443/c035eda9dfea2a1c7a30b06f4dcb8b774302d4e25d0dc4dcc45985fc8a2d7432",
  "wss://nimiq.mopsus.com:",
  "wss://hk1.seed.nimpool.io:443/0e9b0b3b470f02d2928e2d676a6beea0cf959a462101182eebb4f5d5d7c744c7",
  "wss://node.nimiq.watch:8080/5a295d17ac7fd0d70b0d6c607321da8c3518e09bfca51648399f555af4f96c55",
  "wss://seed-1.nimiq.com",
  "wss://seed-2.nimiq.com",
  "wss://seed-3.nimiq.com",
  "wss://seed-4.nimiq-network.com",
  "wss://seed-5.nimiq-network.com",
  "wss://seed-6.nimiq-network.com",
  "wss://seed-7.nimiq.network",
  "wss://seed-8.nimiq.network",
  "wss://seed-9.nimiq.network",
  "wss://seed-10.nimiq.network",
  "wss://seed-11.nimiq.network",
  "wss://seed-12.nimiq.network",
  "wss://seed-13.nimiq-network.com",
  "wss://seed-14.nimiq-network.com",
  "wss://seed-15.nimiq-network.com",
  "wss://seed-16.nimiq.com",
  "wss://seed-17.nimiq.com",
  "wss://seed-18.nimiq.com",
  "wss://seed-19.nimiq.com",
  "wss://seed-20.nimiq.com",
];

async function rpcCall(id, params = []) {
  const req = await fetch("http://localhost:8648", {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: id,
      params,
      id: 1,
    }),
  });
  const json = await req.json();
  return json.result;
}

async function main() {
  let arr = (await rpcCall("peerList")).map(a => a.address);
  arr = arr.filter(line => !SEEDS.map(seed => line.startsWith(seed)).includes(true));
  arr = arr.filter(line => line.startsWith("wss://"));
  arr = arr.filter(line => !line.includes("sunnimiq")); // multiple nodes
  console.error(arr);
  arr.forEach(seed => {
    let client = new WebSocketClient();
    client.on("connect", function(connection) {
      console.log(seed);
    });
    client.on("connectError", function(connection) {
      console.error("Connect error: " + seed);
    });
    client.connect(seed);
  });
}
main();
