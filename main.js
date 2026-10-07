"use strict";
// ============================================================
//  📅 课表 — ToolPkg 入口
//  注册仪表盘路由与侧边栏 / 工具箱入口
// ============================================================
var dash = require("./ui/dashboard/index.ui.js");
var Screen = dash && dash.default ? dash.default : dash;

var ROUTE = "toolpkg:com.xuruchang.timetable:ui:dashboard";

function registerToolPkg() {
    ToolPkg.registerUiRoute({
        id: "dashboard",
        route: ROUTE,
        runtime: "compose_dsl",
        screen: Screen,
        params: {},
        keepAlive: false,
        title: { zh: "📅 课表", en: "📅 Timetable" }
    });
    ToolPkg.registerNavigationEntry({
        id: "timetable_dashboard_toolbox",
        route: ROUTE,
        surface: "toolbox",
        title: { zh: "📅 课表", en: "📅 Timetable" },
        icon: "school",
        order: 151
    });
    ToolPkg.registerNavigationEntry({
        id: "timetable_dashboard_sidebar",
        route: ROUTE,
        surface: "main_sidebar_plugins",
        title: { zh: "📅 课表", en: "📅 Timetable" },
        icon: "school",
        order: 151
    });
    return true;
}

exports.registerToolPkg = registerToolPkg;