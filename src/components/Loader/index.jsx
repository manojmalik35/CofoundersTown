import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// Style
import "./styles.css";

const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

const Loader = () => {
  return (
    <div className="loader-style" >
      <Spin indicator={antIcon} />
    </div>
  );
}

export default Loader;
