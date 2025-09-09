"use client";

import { useState } from "react";

export default function RoomMeasurementList({
  measurementList,
  onVote,
}: {
  measurementList: string[];
  onVote: (voteValue: string) => void;
}) {
  const [selectedMeasurement, setSelectedMeasurement] = useState("");

  return (
    <div className="pb-2">
      <p className="py-6 font-bold text-xl">CARDS TO CHOOSE</p>

      <form>
        <fieldset className="flex gap-6">
          <legend className="hidden">Cards:</legend>

          {measurementList?.map((measurement) => (
            <div key={measurement}>
              <input
                type="checkbox"
                name="cardValue"
                id={`card-value-${measurement}`}
                value={measurement}
                checked={selectedMeasurement === measurement}
                onChange={() => {
                  const isSameValue = selectedMeasurement === measurement;
                  const sanitizedValue = isSameValue ? "" : measurement;

                  setSelectedMeasurement(sanitizedValue);
                  onVote(sanitizedValue);
                }}
              />
              <label htmlFor={`card-value-${measurement}`} className="ml-2">
                {measurement}
              </label>
            </div>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
