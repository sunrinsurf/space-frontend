import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Form/Select";
import { RootState } from "../../../store/reducer";

interface WritePageFormSelectProps {
  dispatcher: any;
  objKey: any;
  showConditions?: {
    [key: string]: React.ReactNode;
  };
}
function WritePageFormSelect({
  dispatcher,
  objKey,
  showConditions
}: WritePageFormSelectProps) {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.Forms.Share);
  const onSelectChange = useCallback(
    (e: React.ChangeEvent) => {
      dispatch(dispatcher((e.target as any).value));
    },
    [dispatch, dispatcher]
  );
  function getOptions() {
    return (
      (form as any)[objKey] &&
      Object.entries((form as any)[objKey].options).map(
        ([key, value]: [any, any]) => {
          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        }
      )
    );
  }
  return (
    <>
      <Select onChange={onSelectChange}>{getOptions()}</Select>
      {showConditions && showConditions[(form as any)[objKey].selected]}
    </>
  );
}

export default WritePageFormSelect;
