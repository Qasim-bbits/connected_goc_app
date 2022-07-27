import React, { useState, useContext } from "react";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import SelectTariff from "./SelectTariff.view";

let bool;
let result = false;
export default function SelectTariffUtils() {
    const [loading, setLoading] = React.useState(false);
    const { plateName, rate } = useContext(globalStateContext);
    const [plate, setPlate] = plateName;
    const [rateData, setRateData] = rate;
    const [parkingUnavailable, setParkingUnavailable] = useState(false);
    const [message, setMessage] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const getSteps = async (data) => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("https://connectedparking.ca/api/getRateSteps/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: rateData._id,
                    plate: plate,
                    rate_type: rateData.rate_type,
                }),
            });
            result = await response.json();

            if (!result.some((step) => step.rate)) {
                bool = false;
            } else {
                bool = true;
            }
        } catch (e) {

        }
        setLoading(false);
        if (!bool) {
            if(result.msg){
                setMessage(result.msg)
                setParkingUnavailable(true)
            } else {
                setToastMessage("Steps Could Not be Fetched!");
                setToastOpen(true)
            }
            return null;
        } else {
            return result;
        }
    };
    return <SelectTariff
      fetchSteps={getSteps}
      message={message}
      toastMessage={toastMessage}
      toastOpen={toastOpen}
      setToastOpen={setToastOpen}
      parkingUnavailable={parkingUnavailable}
    />;
}
