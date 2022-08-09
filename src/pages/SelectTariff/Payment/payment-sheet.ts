import { useCallback, useMemo } from "react"


export const usePaymentSheet = () => {
    // const api = useMemo(() => {
    //     if (process.env.REACT_APP_API_URL) {
    //         return process.env.REACT_APP_API_URL
    //     }
    //     return 'https://j3x0ln9gj7.execute-api.ap-northeast-1.amazonaws.com/dev/'
    // },[])
    const createPaymentIntent = fetch('http://localhost:3001/secret/').then(res => console.log(res.json()));
    return {
        createPaymentIntent,
    }
}