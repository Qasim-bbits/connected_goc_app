import React, { useState, useContext } from "react";
import { globalStateContext } from "../../../context/GlobalStateProvider";
import SelectTariff from "./SelectTariff.view";

let bool;
let result = false;
export default function SelectTariffUtils() {
    const [loading, setLoading] = React.useState(false);
    const { zone, plateName, rateTypes } = useContext(globalStateContext);
    const [zoneId, setZoneId] = zone;
    const [plate, setPlate] = plateName;
    const [rateType, setRateType] = rateTypes;
    const [parkingUnavailable, setParkingUnavailable] = useState(false);
    const [message, setMessage] = useState("");

    const getSteps = async (data) => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("http://35.192.138.41/api/getRateSteps/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: '62d40cf1f7a70f7788b06a68',
                    plate: 'TEST',
                    rate_type: 2,
                }),
            });
            result = await response.json();
            console.log(result);

            if (!result.some((step) => step.rate)) {
                bool = false;
            } else {
                bool = true;
            }
        } catch (e) {
            alert("Oops", e.message);
        }
        setLoading(false);
        if (!bool) {
            if(result.msg){
                setMessage('Parking is not allowed from 2am to 6am')
                setParkingUnavailable(true)
            } else {
                alert("Steps Could Not be Fetched!");
            }
            return null;
        } else {
            return result;
        }
    };
    return <SelectTariff
      fetchSteps={getSteps}
      message={message}
      parkingUnavailable={parkingUnavailable}
    />;
}
