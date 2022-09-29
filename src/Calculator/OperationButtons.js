import { ACTIONS } from "./Calculator";

export default function OperationButtons({ dispatch, operation }) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.CHOOOSE_OPERATION, payload: { operation } })}>{operation}</button>
    )
}