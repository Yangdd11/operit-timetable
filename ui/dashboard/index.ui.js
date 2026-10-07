"use strict";
// ============================================================
//  📅 课表 — 仪表盘（WebView 门面）
//  数据层：/sdcard/Download/Operit/data/xu_timetable/timetable.json
//  展示层：resources/dashboard/timetable.html
//  首次打开时，把包内压着的 courses.json 灌进数据目录，之后以数据目录为准
// ============================================================
var DATA_DIR = "/sdcard/Download/Operit/data/xu_timetable";
var DATA_PATH = DATA_DIR + "/timetable.json";
var PAGE_PATH = DATA_DIR + "/_dashboard.html";
var BRIDGE = "TimetableHost";

function emptyTimetable() {
    return JSON.stringify({
        version: 1,
        meta: { week1_monday: "2026-08-24", weeks_total: 18, slots: [] },
        settings: { theme: "ink", show_room: true, show_teacher: true },
        courses: []
    });
}

/** 部署失败时的兜底页，避免白屏说不出原因 */
function fallbackPage(msg) {
    return '<!DOCTYPE html><html><head><meta charset="utf-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1"></head>'
        + '<body style="margin:0;padding:32px 20px;background:#0C0C11;color:#F2F0EB;'
        + 'font-family:-apple-system,sans-serif;line-height:1.8">'
        + '<div style="font-size:40px">📅</div>'
        + '<h3 style="margin:12px 0 8px;font-size:17px">课表加载失败</h3>'
        + '<p style="font-size:13px;color:#97949F">页面文件没能写入本机存储。'
        + '你的课表数据没有受影响，用对话里的 today / week 仍可查课。</p>'
        + '<p style="font-size:11.5px;color:#5E5B6B;word-break:break-all;margin-top:14px">'
        + '原因：' + String(msg || "unknown").replace(/[<>&]/g, "") + '</p>'
        + '<p style="font-size:11.5px;color:#5E5B6B">路径：' + PAGE_PATH + '</p>'
        + '</body></html>';
}

function Screen(ctx) {
    var UI = ctx.UI;
    var controller = ctx.createWebViewController("timetable_dashboard_webview");
    var _url = ctx.useState("timetableUrl", "");
    var url = _url[0];
    var setUrl = _url[1];

    /** 首次打开：把包里的课表数据灌进数据目录 */
    async function seedData() {
        try {
            var cur = await Tools.Files.read(DATA_PATH);
            var txt = (cur && cur.content) ? String(cur.content) : "";
            if (txt.trim() && txt.indexOf("\"courses\"") >= 0) return "kept";
        } catch (e) {}
        try {
            var res = await ToolPkg.readResource("courses_json");
            if (!res) return "no resource";
            var rf = await Tools.Files.read(String(res));
            var html = (rf && rf.content) ? String(rf.content) : "";
            if (!html || html.indexOf("\"courses\"") < 0) return "resource empty";
            await Tools.Files.mkdir(DATA_DIR, true);
            await Tools.Files.write(DATA_PATH, html);
            return "seeded";
        } catch (e2) {
            return "seed failed: " + (e2 && e2.message ? e2.message : e2);
        }
    }

    function initBridge() {
        controller.addJavascriptInterface(BRIDGE, {
            /** 读取课表；文件不存在时先灌一份包内数据 */
            readData: async function () {
                try {
                    await seedData();
                    var r = await Tools.Files.read(DATA_PATH);
                    var c = (r && r.content) ? String(r.content) : "";
                    return c.trim() ? c : emptyTimetable();
                } catch (e) {
                    return emptyTimetable();
                }
            },
            /** 整写。写前校验结构，坏数据一律拒绝 */
            writeData: async function (json) {
                try {
                    var text = String(json || "");
                    var parsed = JSON.parse(text);
                    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.courses)) {
                        return JSON.stringify({ ok: false, error: "invalid timetable shape" });
                    }
                    await Tools.Files.mkdir(DATA_DIR, true);
                    var w = await Tools.Files.write(DATA_PATH, text);
                    return JSON.stringify({ ok: !(w && w.successful === false), bytes: text.length });
                } catch (e) {
                    return JSON.stringify({ ok: false, error: String(e && e.message ? e.message : e) });
                }
            }
        });
    }

    /** 部署页面：优先 Files.write，失败再退 cp，最后兜底内联 */
    async function deployPage() {
        var lastErr = "";
        try {
            await Tools.Files.mkdir(DATA_DIR, true);
        } catch (e) {
            lastErr = "mkdir: " + (e && e.message ? e.message : e);
        }
        try {
            var res = await ToolPkg.readResource("dashboard_html");
            if (res) {
                var html = "";
                try {
                    var rf = await Tools.Files.read(String(res));
                    html = (rf && rf.content) ? String(rf.content) : "";
                } catch (e2) {
                    lastErr = "readResource file: " + (e2 && e2.message ? e2.message : e2);
                }
                if (html && html.indexOf("<html") >= 0) {
                    await Tools.Files.write(PAGE_PATH, html);
                    return { ok: true, via: "files.write" };
                }
                try {
                    await Tools.System.terminal.hiddenExec('cp "' + res + '" "' + PAGE_PATH + '"');
                    var chk = await Tools.Files.read(PAGE_PATH);
                    if (chk && chk.content && String(chk.content).indexOf("<html") >= 0) {
                        return { ok: true, via: "terminal.cp" };
                    }
                    lastErr = lastErr || "cp produced empty file";
                } catch (e3) {
                    lastErr = "cp: " + (e3 && e3.message ? e3.message : e3);
                }
            } else {
                lastErr = "readResource returned empty";
            }
        } catch (e4) {
            lastErr = "readResource: " + (e4 && e4.message ? e4.message : e4);
        }
        try {
            await Tools.Files.write(PAGE_PATH, fallbackPage(lastErr));
        } catch (e5) {}
        return { ok: false, via: "fallback", error: lastErr };
    }

    async function boot() {
        initBridge();
        await seedData();
        await deployPage();
        var u = "file://" + PAGE_PATH + "?v=" + Date.now();
        setUrl(u);
        controller.loadUrl(u);
    }

    return UI.Box({ fillMaxSize: true, onLoad: boot }, [
        UI.WebView({
            fillMaxSize: true,
            controller: controller,
            key: "timetable_dashboard_webview",
            url: url,
            javaScriptEnabled: true,
            domStorageEnabled: true,
            allowFileAccess: true,
            allowFileAccessFromFileURLs: true,
            allowUniversalAccessFromFileURLs: true,
            supportZoom: false
        })
    ]);
}

exports.default = Screen;