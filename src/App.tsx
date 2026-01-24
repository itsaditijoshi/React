import { useEffect, useState } from "react";

function App() {
  const [info, setInfo] = useState({
    browserName: "",
    browserVersion: "",
    userAgent: "",
    platform: "",
    language: "",
    onlineStatus: "",
    cookiesEnabled: "",
    cpuCores: "",
    memory: "",
    location: "",
  });

  useEffect(() => {
    setInfo({
      browserName: navigator.appName,
      browserVersion: navigator.appVersion,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      onlineStatus: navigator.onLine ? "Online" : "Offline",
      cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
      cpuCores: navigator.hardwareConcurrency,
      memory: navigator.deviceMemory
        ? navigator.deviceMemory + " GB"
        : "Not available",
      location: "Click button to allow",
    });
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setInfo((prev) => ({
            ...prev,
            location:
              pos.coords.latitude.toFixed(4) +
              ", " +
              pos.coords.longitude.toFixed(4),
          }));
        },
        () => {
          setInfo((prev) => ({
            ...prev,
            location: "Permission denied",
          }));
        }
      );
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-[90%] max-w-xl space-y-2">
        <h1 className="text-2xl font-bold text-center mb-4">
          Navigator Information
        </h1>

        <p><b>Browser Name:</b> {info.browserName}</p>
        <p><b>Browser Version:</b> {info.browserVersion}</p>
        <p><b>User Agent:</b> {info.userAgent}</p>
        <p><b>Platform:</b> {info.platform}</p>
        <p><b>Language:</b> {info.language}</p>
        <p><b>Online Status:</b> {info.onlineStatus}</p>
        <p><b>Cookies Enabled:</b> {info.cookiesEnabled}</p>
        <p><b>CPU Cores:</b> {info.cpuCores}</p>
        <p><b>Device Memory:</b> {info.memory}</p>
        <p><b>Location:</b> {info.location}</p>

        <button
          onClick={getLocation}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
        >
          Get Location
        </button>
      </div>
    </div>
  );
}

export default App;
