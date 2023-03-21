import { DatePicker, Space } from "antd";
import React, { useMemo, useState } from "react";

function App2() {
  const [date, setDate] = useState();
  const onChange = (dateString) => {
    // console.log(date, dateString);
    setDate(dateString);
  };
  const x = useMemo(
    () => <DatePicker onChange={onChange} className="border-success" />,
    [date]
  );
  return <Space direction="vertical">{x}</Space>;
}
export default App2;
