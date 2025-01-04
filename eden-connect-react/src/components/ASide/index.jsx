import React from "react";
import Advertise from "./Advertise";
import AdminASide from "./AdminASide";
import PinTop from "./PinTop";
import TagsComponent from "./TagsComponent";
import HotArticles from "./HotArticles";
import "./index.css";

function ASide() {
  return (
    <div id="aside">
      {/* 广告(有生之年占位符)*/}
      <Advertise></Advertise>
      <div className="aside-placeholder"></div>
      {/* 管理员页面 */}
      <AdminASide></AdminASide>
      <div className="aside-placeholder"></div>
      {/* 置顶文章 */}
      <PinTop></PinTop>
      <div className="aside-placeholder"></div>
      {/* Tags */}
      {/* <TagsComponent></TagsComponent>
      <div className="aside-placeholder"></div> */}
      {/* Popular Articles */}
      {/* <HotArticles></HotArticles> */}
      {/* <div className="aside-placeholder"></div> */}
    </div>
  );
}

export default ASide;
