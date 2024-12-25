import React from "react";

const Result = ({ data }) => {
  if (!data || !data.alerts || data.alerts.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          No Data Available
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Please run a scan to view the results.
        </p>
      </div>
    );
  }

  const groupByUrl = data.alerts.reduce((acc, alert) => {
    if (!acc[alert.url]) acc[alert.url] = [];
    acc[alert.url].push(alert);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Security Report Summary
      </h1>

      {Object.entries(groupByUrl).map(([url, alerts], index) => (
        <div
          key={index}
          className="mb-8 border rounded-lg p-6 bg-gray-50 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            URL:{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {url}
            </a>
          </h2>

          <ul className="space-y-4">
            {alerts.map((alert, idx) => (
              <li
                key={idx}
                className="p-4 bg-white border rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {alert.alert}
                </h3>
                <p className="text-gray-600">
                  <strong>Description:</strong> {alert.description}
                </p>
                {alert.solution && (
                  <p className="text-gray-600">
                    <strong>Solution:</strong> {alert.solution}
                  </p>
                )}
                {alert.tags && (
                  <div className="mt-2">
                    <strong>Tags:</strong>
                    <ul className="list-disc ml-6 text-sm text-gray-500">
                      {Object.entries(alert.tags).map(([tag, link]) => (
                        <li key={tag}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {alert.evidence && (
                  <p className="text-gray-600 mt-2">
                    <strong>Evidence:</strong>{" "}
                    <code className="bg-gray-200 p-1 rounded">
                      {alert.evidence}
                    </code>
                  </p>
                )}
                <p className="text-gray-600 mt-2">
                  <strong>Risk:</strong> {alert.risk}
                </p>
                {alert.reference && (
                  <p className="text-gray-600">
                    <strong>Reference:</strong>{" "}
                    <a
                      href={alert.reference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {alert.reference}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Result;
