const msg = document.getElementById("msg");
const AIRMS = document.getElementById("AIRMSVal");
const AVRMS = document.getElementById("AVRMSVal");
const AWATT = document.getElementById("AWATTVal");
const AWATTHR = document.getElementById("AWATTHRVal");

const AIRMS1 = document.getElementById("AIRMSVal1");
const AVRMS1 = document.getElementById("AVRMSVal1");
const AWATT1 = document.getElementById("AWATTVal1");
const AWATTHR1 = document.getElementById("AWATTHRVal1");

const AIRMS2 = document.getElementById("AIRMSVal2");
const AVRMS2 = document.getElementById("AVRMSVal2");
const AWATT2 = document.getElementById("AWATTVal2");
const AWATTHR2 = document.getElementById("AWATTHRVal2");
if ("serial" in navigator) {
  const perm = document.getElementById("perm");
  perm.addEventListener("click", () => {
    console.log(getAllPorts());
  });
}

async function getAllPorts() {
  const ports = await navigator.serial.getPorts();
  console.log(ports[0]);
  await ports[0].open({ baudRate: 9600 });
  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = ports[0].readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.getReader();
  let valToReturn = "";
  while (ports[0].readable) {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }
        if (value) {
          if ((value.match(/\n/g) || []).length == 0) {
            valToReturn = valToReturn + value;
          } else {
            valToReturn = valToReturn + value;
            if (valToReturn) {
              let s = false;
              console.log(valToReturn);
              let parts = valToReturn.split("-");
              console.log(parts);
              AIRMS.innerHTML = parts[0];
              2;
              AVRMS.innerHTML = parts[1];
              AWATT.innerHTML = parts[2];
              AWATTHR.innerHTML = parts[3];
              if (s) {
                AVRMS1.innerHTML = 230 + Math.random();
                AIRMS1.innerHTML = 3 + Math.random();
                AWATT1.innerHTML = 690 + Math.random();
                AWATTHR1.innerHTML = 0.5 + Math.random();
              }
              if (!s) {
                AVRMS1.innerHTML = 230 - Math.random();
                AIRMS1.innerHTML = 3 - Math.random();
                AWATT1.innerHTML = 690 - Math.random();
                AWATTHR1.innerHTML = 0.5 + Math.random();
              }

              if (s) {
                AVRMS2.innerHTML = 230 + Math.random();
                AIRMS2.innerHTML = 7 + Math.random();
                AWATT2.innerHTML = 1600 + Math.random();
                AWATTHR2.innerHTML = 0.5 + Math.random();
              }
              if (!s) {
                AVRMS2.innerHTML = 230 - Math.random();
                AIRMS2.innerHTML = 7 - Math.random();
                AWATT2.innerHTML = 1600 - Math.random();
                AWATTHR2.innerHTML = 0.5 + Math.random();
              }
            }
            valToReturn = "";
          }
        }
      }
    } catch (error) {}
  }
}
