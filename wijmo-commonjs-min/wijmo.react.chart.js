﻿/*
    *
    * Wijmo Library 5.20172.334
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
"use strict";
var __extends=this && this.__extends || function()
{
var extendStatics=Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d, b)
{
d.__proto__ = b
} || function(d, b)
{
for (var p in b)
b.hasOwnProperty(p) && (d[p] = b[p])
};
return function(d, b)
{
function __()
{
this.constructor = d
}
extendStatics(d, b);
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __)
}
}(),
FlexChart,
Wj;
Object.defineProperty(exports, "__esModule", {value: !0});
var wjcReactBase=require("wijmo/wijmo.react.base"),
wjcChart=require("wijmo/wijmo.chart"),
wjcSelf=require("wijmo/wijmo.react.chart");
window.wijmo = window.wijmo || {};
window.wijmo.react = window.wijmo.react || {};
window.wijmo.react.chart = wjcSelf;
FlexChart = function(_super)
{
function FlexChart(props)
{
return _super.call(this, props, wjcChart.FlexChart) || this
}
return __extends(FlexChart, _super), FlexChart
}(wjcReactBase.ComponentBase);
exports.FlexChart = FlexChart;
Wj = wjcReactBase