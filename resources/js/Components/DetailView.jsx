import React from "react";

export default function DetailView({ data }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="mb-3">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {key
                            .split("_")
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                    </div>
                    <div className="mt-1 text-sm text-gray-900 dark:text-white">
                        {value !== null && value !== undefined
                            ? typeof value === "boolean"
                                ? value
                                    ? "Ya"
                                    : "Tidak"
                                : String(value)
                            : "-"}
                    </div>
                </div>
            ))}
        </div>
    );
}
