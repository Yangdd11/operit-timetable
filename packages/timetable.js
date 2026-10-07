/* METADATA
{
  "name": "timetable",
  "display_name": {
    "zh": "📅 课表",
    "en": "📅 Timetable"
  },
  "description": {
    "zh": "课表：问今天上什么课、看某一整周、下一节课什么时候、课程清单，都能按「第几周」自动过滤（4-18 周、6-9 周、只上第 8 周这种）。",
    "en": "Class timetable tools: today's classes, a whole week, the next class, the course list, all filtered by teaching week (4-18, 6-9, week 8 only)."
  },
  "category": "Utility",
  "tools": [
    {
      "name": "today",
      "description": {
        "zh": "看某一天上什么课（不传日期就是今天）。会自动按第几周过滤：没到的课、上完的课都不会冒出来。返回时间、教室、老师和总时长。",
        "en": "Classes on a given day (defaults to today), already filtered by teaching week. Returns time, room, teacher and total hours."
      },
      "parameters": [
        { "name": "date", "description": "日期，格式 YYYY-MM-DD，不填默认今天；也支持「明天」「昨天」", "type": "string", "required": false }
      ]
    },
    {
      "name": "week",
      "description": {
        "zh": "看一整周的课，按周一到周日排好，每晚也列上（第9-12节）。可以指定周次或某一天所在的那一周。",
        "en": "The whole week laid out Monday to Sunday, evening periods included. Specify a week number or any date inside that week."
      },
      "parameters": [
        { "name": "week", "description": "第几周，例如 7；不填默认本周", "type": "number", "required": false },
        { "name": "date", "description": "也可以给一个日期（YYYY-MM-DD），看它所在的那一周", "type": "string", "required": false }
      ]
    },
    {
      "name": "next",
      "description": {
        "zh": "下一节课是什么：从此刻往后找最近的一节课（今天剩下的，或者未来 14 天里的），返回还有多久、几点、在哪个教室。",
        "en": "The next class from now on (rest of today, or within 14 days): how long until it starts, the time, and the room."
      },
      "parameters": [
        { "name": "now", "description": "可选，假装现在是这个时间（HH:mm），用来推算；不填用真实时间", "type": "string", "required": false }
      ]
    },
    {
      "name": "courses",
      "description": {
        "zh": "列全部课程：课程名、老师、教室、星期几、第几节、上哪些周。",
        "en": "List every course: name, teacher, room, weekday, periods, and which weeks it runs."
      },
      "parameters": []
    },
    {
      "name": "config",
      "description": {
        "zh": "查看或修改设置：学期第 1 周的周一日期、总周数、皮肤（ink 午夜金 / strawberry 草莓牛奶 / mint 雾薄荷，跟账本同一套色）、是否显示教室和老师。不传参数则只查看。",
        "en": "View or update settings: Monday of week 1, total weeks, theme (ink / strawberry / mint), whether to show room and teacher."
      },
      "parameters": [
        { "name": "week1_monday", "description": "学期第 1 周的周一日期，格式 YYYY-MM-DD", "type": "string", "required": false },
        { "name": "weeks_total", "description": "本学期总周数，默认 18", "type": "number", "required": false },
        { "name": "theme", "description": "仪表盘皮肤：ink（午夜金，默认暗色）/ strawberry（草莓牛奶）/ mint（雾薄荷）", "type": "string", "required": false },
        { "name": "show_room", "description": "格子里是否显示教室（true/false）", "type": "boolean", "required": false },
        { "name": "show_teacher", "description": "是否显示老师（true/false）", "type": "boolean", "required": false }
      ]
    },
    {
      "name": "holiday",
      "description": {
        "zh": "假期表：列出 / 添加 / 删除停课假期（国庆、寒假这种）。加了之后放假日就不会再排课，今天会说「放假中」，下一节课会自动跳过。不传参数只查看。",
        "en": "Holiday list: list, add or remove no-class periods. Once added, holidays stop showing classes, today reports a holiday, and next class skips them."
      },
      "parameters": [
        { "name": "name", "description": "假期名字，例如「中秋·国庆连休」", "type": "string", "required": false },
        { "name": "from", "description": "开始日期 YYYY-MM-DD", "type": "string", "required": false },
        { "name": "to", "description": "结束日期 YYYY-MM-DD（含当天）", "type": "string", "required": false },
        { "name": "remove", "description": "要删的假期：填名字，或填起始日期", "type": "string", "required": false }
      ]
    },
    {
      "name": "makeup",
      "description": {
        "zh": "补课日（调课）表：列出 / 添加 / 删除补课日，比如调休后的周六照周三的课表上；也可以只补半天（part=晚上：白天照自己的课表，晚上补指定那天的晚间课）。加了之后那天就会按规则排课。不传参数只查看。",
        "en": "Make-up class days: list, add or remove days that follow another weekday's timetable, e.g. a Saturday after a holiday running Wednesday's classes. Part can be limited to evening or daytime only."
      },
      "parameters": [
        { "name": "date", "description": "补课那天的日期 YYYY-MM-DD，例如 2026-10-10", "type": "string", "required": false },
        { "name": "as", "description": "那天照星期几的课表上：1-7（周一=1），也可以写「周四」", "type": "string", "required": false },
        { "name": "part", "description": "可选，只补半天：写「晚上」= 白天照自己那天的课、晚上补 as 那天的第9-12节；写「白天」= 只补 as 那天的第1-8节；不填 = 整天都照 as 那天上", "type": "string", "required": false },
        { "name": "remove", "description": "删掉哪个补课日，填日期", "type": "string", "required": false }
      ]
    },
    {
      "name": "selftest",
      "description": {
        "zh": "自检：验周次解析、第几周推算、按周过滤有没有出错，逐项报告。不会改数据。",
        "en": "Self-check the week parsing, week-number math and weekly filtering. Reports pass or fail per item and never writes data."
      },
      "parameters": []
    }
  ]
}
*/
// ============================================================
//  📅 课表 — 工具
//  数据文件：/sdcard/Download/Operit/data/xu_timetable/timetable.json
// ============================================================
"use strict";

var DATA_DIR = "/sdcard/Download/Operit/data/xu_timetable";
var DATA_PATH = DATA_DIR + "/timetable.json";
var ACTIVE_PATH = DATA_PATH;

var WD_NAMES = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];

function pad2(n) { return (n < 10 ? "0" : "") + n; }

function fmtDate(d) {
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
}

/** 本地零点，避免时区把日期算歪 */
function parseDate(s) {
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(s || "").trim());
    if (!m) return null;
    var d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    d.setHours(0, 0, 0, 0);
    return d;
}

function todayDate() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

function dayDiff(a, b) { return Math.round((b.getTime() - a.getTime()) / 86400000); }

/** 日期 → ISO 星期（周一=1 … 周日=7） */
function weekdayOf(dateStr) {
    var d = parseDate(dateStr);
    if (!d) return 0;
    var w = d.getDay();
    return w === 0 ? 7 : w;
}

/** 把「明天 / 昨天 / 今天 / YYYY-MM-DD」统一成 YYYY-MM-DD */
function resolveDate(v) {
    var s = String(v || "").trim();
    if (!s || s === "今天" || s === "今日") return fmtDate(todayDate());
    if (s === "明天") return fmtDate(new Date(todayDate().getTime() + 86400000));
    if (s === "后天") return fmtDate(new Date(todayDate().getTime() + 172800000));
    if (s === "昨天") return fmtDate(new Date(todayDate().getTime() - 86400000));
    var d = parseDate(s);
    if (d) return fmtDate(d);
    return null;
}

async function loadData() {
    var raw = "";
    try {
        var r = await Tools.Files.read(ACTIVE_PATH);
        raw = (r && r.content) ? String(r.content) : "";

    } catch (e) {
        raw = "";
    }
    if (!raw.trim()) return null;
    try {
        var d = JSON.parse(raw);
        if (!d || !Array.isArray(d.courses)) return null;
        d.meta = d.meta || {};
        d.settings = d.settings || {};
        return d;
    } catch (e2) {
        return null;
    }
}

async function saveData(data) {
    await Tools.Files.mkdir(DATA_DIR, true);
    await Tools.Files.write(ACTIVE_PATH, JSON.stringify(data, null, 2));
}

var NO_DATA_MSG = "❌ 还没读到课表数据（" + DATA_PATH + "）。"
    + "\n先去工具箱里打开一次「📅 课表」，我压的那份数据是这么灌进去的。";

function slotTime(data, n) {
    var slots = (data.meta && data.meta.slots) || [];
    for (var i = 0; i < slots.length; i++) if (slots[i].n === n) return slots[i];
    return null;
}

/** 解析周次串：4-18 / 8 / 6-9 / 1-18单 / 1-18双 / 4-8,12-16 */
function parseWeeks(spec, total) {
    var out = {};
    var s = String(spec == null ? "" : spec).trim();
    if (!s) return [];
    var parts = s.split(",");
    for (var p = 0; p < parts.length; p++) {
        var seg = parts[p].trim();
        if (!seg) continue;
        var parity = 0; // 0=不限 1=单 2=双
        if (/单$/.test(seg)) { parity = 1; seg = seg.replace(/单$/, ""); }
        else if (/双$/.test(seg)) { parity = 2; seg = seg.replace(/双$/, ""); }
        var a = 0, b = 0;
        var m = /^(\d+)\s*-\s*(\d+)$/.exec(seg);
        if (m) { a = Number(m[1]); b = Number(m[2]); }
        else if (/^\d+$/.test(seg)) { a = b = Number(seg); }
        else continue;
        if (a > b) { var t = a; a = b; b = t; }
        for (var w = a; w <= b; w++) {
            if (w < 1) continue;
            if (total && w > total) continue;
            if (parity === 1 && w % 2 === 0) continue;
            if (parity === 2 && w % 2 === 1) continue;
            out[w] = true;
        }
    }
    var list = [];
    for (var k in out) if (out.hasOwnProperty(k)) list.push(Number(k));
    list.sort(function (x, y) { return x - y; });
    return list;
}

function weeksText(spec) {
    var s = String(spec == null ? "" : spec);
    if (/^\d+$/.test(s)) return "只上第 " + s + " 周";
    return s.replace(/-/g, "–") + " 周";
}

/** 某天是第几周（1 起算；放假/开学前可能 <=0） */
function weekOf(dateStr, data) {
    var w1 = parseDate((data.meta && data.meta.week1_monday) || "");
    var d = parseDate(dateStr);
    if (!w1 || !d) return 0;
    return Math.floor(dayDiff(w1, d) / 7) + 1;
}

function weekStartOf(dateStr, data) {
    var w1 = parseDate((data.meta && data.meta.week1_monday) || "");
    var d = parseDate(dateStr);
    if (!w1 || !d) return null;
    var off = dayDiff(w1, d) % 7;
    if (off < 0) off += 7;
    return new Date(d.getTime() - off * 86400000);
}
/** 是否连续的两个节次 */
function isConsecutive(a, b) { return b === a + 1; }

/* ---------- 假期表 ---------- */

/** meta.holidays = [{name, from, to}] */
function holidays(data) {
    var hs = (data && data.meta && data.meta.holidays) || [];
    return Array.isArray(hs) ? hs : [];
}

/** 某天在不在假期里；命中返回假期信息，否则 null */
function holidayOf(dateStr, data) {
    var d = parseDate(dateStr);
    if (!d) return null;
    var list = holidays(data);
    for (var i = 0; i < list.length; i++) {
        var h = list[i] || {};
        var a = parseDate(h.from), b = parseDate(h.to);
        if (!a || !b) continue;
        if (d.getTime() >= a.getTime() && d.getTime() <= b.getTime()) {
            return {
                name: h.name || "放假",
                from: fmtDate(a),
                to: fmtDate(b),
                day_index: dayDiff(a, d) + 1,
                day_count: dayDiff(a, b) + 1,
                days_left: dayDiff(d, b)
            };
        }
    }
    return null;
}

function holidayDays(h) {
    var a = parseDate(h && h.from), b = parseDate(h && h.to);
    if (!a || !b) return 0;
    return dayDiff(a, b) + 1;
}
/* ---------- 补课日（调休 / 调课） ---------- */
/** meta.makeups = [{date, as_day}] 那天照 as_day 的课表上课 */
function makeups(data) {
    var m = (data && data.meta && data.meta.makeups) || [];
    return Array.isArray(m) ? m : [];
}
function makeupOf(dateStr, data) {
    var list = makeups(data);
    for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i].date === dateStr) return list[i];
    }
    return null;
}
function dayName(n) { return WD_NAMES[Number(n)] || "?"; }
/* ---------- 补课：全天 / 只补晚上 / 只补白天 ---------- */
function partsOf(mk) {
    var p = (mk && mk.part) ? String(mk.part).toLowerCase() : "all";
    if (p !== "evening" && p !== "day") p = "all";
    return p;
}
function parsePart(v) {
    var t = String(v == null ? "" : v).trim().toLowerCase();
    if (!t) return "all";
    if (/晚|夜|evening|night/.test(t)) return "evening";
    if (/白天|上午|早上|日间|day/.test(t)) return "day";
    return "all";
}
function makeupLabel(mk) {
    if (!mk) return "";
    var p = partsOf(mk);
    if (p === "evening") return "补 " + dayName(mk.as_day) + " 晚";
    if (p === "day") return "补 " + dayName(mk.as_day) + " 白天";
    return "补 " + dayName(mk.as_day);
}
function makeupDesc(mk) {
    if (!mk) return "";
    var p = partsOf(mk);
    if (p === "evening") return "晚上照 " + dayName(mk.as_day) + " 的课表上";
    if (p === "day") return "白天照 " + dayName(mk.as_day) + " 的课表上";
    return "照 " + dayName(mk.as_day) + " 的课表上";
}
/** 「周四」/「4」/「星期4」→ 4 */
function parseAsDay(v) {
    var s = String(v == null ? "" : v).trim();
    if (!s) return 0;
    var m = /^(?:周|星期|礼拜)?\s*([1-7一二三四五六日天])$/.exec(s);
    if (!m) return 0;
    var g = m[1];
    var map = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "日": 7, "天": 7 };
    return map[g] || Number(g) || 0;
}


/** 跨过午休 / 晚休就不算同一块（第4节之后、第8节之后） */
function crossesBreak(a, b) { return (a === 4 && b === 5) || (a === 8 && b === 9); }

/**
 * 某天的课。返回 { date, weekday, week, blocks:[{course, slots, start, end}] }
 * blocks 把连着上的同一门课并成一块（1-2 节 → 一块，时间 08:15–09:45）
 */
function blocksOn(dateStr, data, opt) {
    var weekday = weekdayOf(dateStr);
    var week = weekOf(dateStr, data);
    var hol = (opt && opt.ignoreHoliday) ? null : holidayOf(dateStr, data);
    if (hol) return { date: dateStr, weekday: weekday, week: week, blocks: [], holiday: hol, makeup: null, makeupPart: null };
    var mk = makeupOf(dateStr, data);
    var part = mk ? partsOf(mk) : "all";
    var teachDay = (mk && Number(mk.as_day)) ? Number(mk.as_day) : weekday;
    var total = Number(data.meta.weeks_total) || 18;
    var courses = data.courses || [];
    var picked = [];
    /* 收集某天的课（可只取某个节次区间） */
    function collect(day, minS, maxS) {
        if (week < 1) return;
        for (var i = 0; i < courses.length; i++) {
            var c = courses[i];
            if (Number(c.day) !== day) continue;
            var ws = parseWeeks(c.weeks, total);
            var hit = false;
            for (var j = 0; j < ws.length; j++) if (ws[j] === week) { hit = true; break; }
            if (!hit) continue;
            var sl = (c.slots || []).slice(0).sort(function (x, y) { return x - y; });
            if (minS || maxS) sl = sl.filter(function (n) { return (!minS || n >= minS) && (!maxS || n <= maxS); });
            if (!sl.length) continue;
            picked.push({ c: c, slots: sl });
        }
    }
    if (!mk) collect(weekday, 0, 0);
    else if (part === "evening") { collect(weekday, 1, 8); collect(teachDay, 9, 12); }
    else if (part === "day") { collect(weekday, 9, 12); collect(teachDay, 1, 8); }
    else collect(teachDay, 0, 0);
    picked.sort(function (a, b) { return Math.min.apply(null, a.slots) - Math.min.apply(null, b.slots); });
    var blocks = [];
    for (var k = 0; k < picked.length; k++) {
        var c2 = picked[k].c;
        var slots = picked[k].slots;
        var run = [slots[0]];
        for (var m2 = 1; m2 < slots.length; m2++) {
            if (isConsecutive(slots[m2 - 1], slots[m2]) && !crossesBreak(slots[m2 - 1], slots[m2])) run.push(slots[m2]);
            else {
                blocks.push(makeBlock(c2, run, data));
                run = [slots[m2]];
            }
        }
        blocks.push(makeBlock(c2, run, data));
    }
    return { date: dateStr, weekday: weekday, week: week, blocks: blocks, holiday: null, makeup: mk || null, makeupPart: mk ? part : null };
}

function makeBlock(course, slots, data) {
    var s1 = slotTime(data, slots[0]);
    var s2 = slotTime(data, slots[slots.length - 1]);
    return {
        name: course.name,
        teacher: course.teacher || "",
        room: course.room || "",
        color: course.color || "",
        slots: slots,
        start: s1 ? s1.start : "",
        end: s2 ? s2.end : ""
    };
}

function slotLabel(slots) {
    if (!slots || !slots.length) return "";
    if (slots.length === 1) return "第" + slots[0] + "节";
    return "第" + slots[0] + "-" + slots[slots.length - 1] + "节";
}

function minutesOf(hhmm) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || "").trim());
    if (!m) return -1;
    return Number(m[1]) * 60 + Number(m[2]);
}

function blockLine(b, data) {
    var bits = [];
    bits.push("🕐 " + b.start + "–" + b.end + "（" + slotLabel(b.slots) + "）");
    if (b.room && data.settings.show_room !== false) bits.push("📍 " + b.room);
    if (b.teacher && data.settings.show_teacher !== false) bits.push("👤 " + b.teacher);
    return "· " + b.name + "\n  " + bits.join("　");
}

async function today(params) {
    params = params || {};
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    var date = resolveDate(params.date);
    if (!date) return { success: false, message: "❌ 日期不认，用 YYYY-MM-DD。" };
    var info = blocksOn(date, data);
    var total = 0;
    for (var i = 0; i < info.blocks.length; i++) total += info.blocks[i].slots.length;
    var head = "📅 " + date + "（" + (WD_NAMES[info.weekday] || "?") + "）· "
        + (info.week >= 1 ? "第 " + info.week + " 周" : "还没开学");
    if (info.makeup) head += "📌补课日：" + makeupDesc(info.makeup);
    if (info.holiday) {
        var h = info.holiday;
        return {
            success: true,
            message: head + "\n🎈 放假中——" + h.name + "（" + h.from + " ~ " + h.to + "，共 " + h.day_count + " 天）"
                + "\n今天是假期第 " + h.day_index + " 天"
                + (h.days_left > 0 ? "，还剩 " + h.days_left + " 天" : "，今天是最后一天"),
            date: date, week: info.week, weekday: info.weekday, blocks: [], lessons: 0, holiday: h
        };
    }
    if (!info.blocks.length) {
        return {
            success: true,
            message: head + "\n今天一节都没有，睡到自然醒。",
            date: date, week: info.week, weekday: info.weekday, blocks: [], lessons: 0
        };
    }
    var lines = [head, "今天 " + info.blocks.length + " 门课、共 " + total + " 节："];
    for (var j = 0; j < info.blocks.length; j++) lines.push(blockLine(info.blocks[j], data));
    return {
        success: true,
        message: lines.join("\n"),
        date: date, week: info.week, weekday: info.weekday, blocks: info.blocks, lessons: total
    };
}

async function week(params) {
    params = params || {};
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    var anchor = resolveDate(params.date) || fmtDate(todayDate());
    var w1 = parseDate((data.meta && data.meta.week1_monday) || "");
    var start = weekStartOf(anchor, data);
    var wk = weekOf(anchor, data);
    if (params.week != null && String(params.week) !== "") {
        var n = Number(params.week);
        if (!n || n < 1) return { success: false, message: "❌ 周次要给个正整数。" };
        wk = n;
        if (w1) start = new Date(w1.getTime() + (n - 1) * 7 * 86400000);
    }
    if (!start) return { success: false, message: "❌ 没设学期第 1 周的周一，先用 config 设一下。" };
    var total = Number(data.meta.weeks_total) || 18;
    var end = new Date(start.getTime() + 6 * 86400000);
    var head = "📅 第 " + wk + " 周　" + fmtDate(start) + " ~ " + fmtDate(end);
    if (wk < 1) return { success: true, message: head + "\n（这是开学前，还没课）", week: wk, days: [] };
    if (wk > total) return { success: true, message: head + "\n（学期已经上完了）", week: wk, days: [] };

    var days = [];
    var lines = [head];
    var countAll = 0;
    for (var i = 0; i < 7; i++) {
        var d = new Date(start.getTime() + i * 86400000);
        var ds = fmtDate(d);
        var info = blocksOn(ds, data);
        countAll += info.blocks.length;
        days.push({ date: ds, weekday: i + 1, blocks: info.blocks, holiday: info.holiday || null, makeup: info.makeup || null });
        var dayHead = "\n【" + WD_NAMES[i + 1] + " " + (d.getMonth() + 1) + "/" + d.getDate() + "】";
        if (info.makeup) dayHead += " 📌" + makeupLabel(info.makeup);
        if (info.holiday) {
            lines.push(dayHead + " 🎈放假（" + info.holiday.name + "）");
            continue;
        }
        if (!info.blocks.length) {
            lines.push(dayHead + " 没课");
            continue;
        }
        lines.push(dayHead);
        for (var j = 0; j < info.blocks.length; j++) lines.push(blockLine(info.blocks[j], data));
    }
    lines.push("\n这周一共 " + countAll + " 门次课。");
    return { success: true, message: lines.join("\n"), week: wk, start: fmtDate(start), end: fmtDate(end), days: days };
}

async function next(params) {
    params = params || {};
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    var nowMin = -1;
    if (params.now && /^\d{1,2}:\d{2}$/.test(String(params.now).trim())) {
        nowMin = minutesOf(String(params.now).trim());
    } else {
        var nd = new Date();
        nowMin = nd.getHours() * 60 + nd.getMinutes();
    }
    var base = todayDate();
    var holidaySkipped = 0;
    for (var i = 0; i < 14; i++) {
        var d = new Date(base.getTime() + i * 86400000);
        var ds = fmtDate(d);
        var info = blocksOn(ds, data);
        if (info.holiday) { holidaySkipped++; continue; }
        for (var j = 0; j < info.blocks.length; j++) {
            var b = info.blocks[j];
            var st = minutesOf(b.start);
            if (i === 0 && st <= nowMin) continue; // 今天已经开始的跳过
            var gapMin = (i === 0) ? (st - nowMin) : -1;
            var when = (i === 0)
                ? (gapMin + " 分钟后")
                : (i === 1 ? "明天" : (i === 2 ? "后天" : "还有 " + i + " 天"));
            var lines = [
                "⏭ 下一节课：" + b.name,
                "🕐 " + b.start + "–" + b.end + "（" + slotLabel(b.slots) + "）· " + when
                    + "　" + ds + "（" + WD_NAMES[info.weekday] + "）",
                "📅 第 " + info.week + " 周"
                    + (b.room ? "　📍 " + b.room : "")
                    + (b.teacher ? "　👤 " + b.teacher : "")
            ];
            return {
                success: true,
                message: lines.join("\n")
                    + (holidaySkipped ? "\n（🎈 假期中，往后跳过了 " + holidaySkipped + " 天）" : ""),
                date: ds, week: info.week, name: b.name, start: b.start, end: b.end,
                room: b.room, teacher: b.teacher, slots: b.slots,
                minutes_until: i === 0 ? gapMin : null
            };
        }
    }
    return { success: true, message: "⏭ 往后 14 天都没课。放假了吧？" };
}

async function courses() {
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    var list = (data.courses || []).slice(0).sort(function (a, b) {
        if (Number(a.day) !== Number(b.day)) return Number(a.day) - Number(b.day);
        return Math.min.apply(null, a.slots) - Math.min.apply(null, b.slots);
    });
    var lines = ["📚 共 " + list.length + " 门课（" + (data.meta.class_name || "") + "）："];
    var out = [];
    for (var i = 0; i < list.length; i++) {
        var c = list[i];
        var slots = (c.slots || []).slice(0).sort(function (x, y) { return x - y; });
        var item = {
            name: c.name, teacher: c.teacher || "", room: c.room || "",
            weekday: Number(c.day), slots: slots, weeks: c.weeks,
            time: (slotTime(data, slots[0]) || {}).start + "–" + ((slotTime(data, slots[slots.length - 1]) || {}).end || "")
        };
        out.push(item);
        lines.push("· " + (WD_NAMES[item.weekday] || "") + " " + slotLabel(slots) + "（" + item.time + "）　" + c.name
            + "　" + (c.room ? "📍 " + c.room : "📍 教室待定")
            + (c.teacher ? "　👤 " + c.teacher : "")
            + "　" + weeksText(c.weeks));
    }
    return { success: true, message: lines.join("\n"), count: list.length, courses: out };
}

async function config(params) {
    params = params || {};
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    var changed = [];
    if (params.week1_monday && String(params.week1_monday).trim()) {
        var d = parseDate(params.week1_monday);
        if (!d) return { success: false, message: "❌ 日期要写 YYYY-MM-DD。" };
        data.meta.week1_monday = fmtDate(d);
        changed.push("第 1 周周一");
    }
    if (params.weeks_total != null && String(params.weeks_total).trim() !== "") {
        var n = Number(params.weeks_total);
        if (!n || n < 1 || n > 30) return { success: false, message: "❌ 总周数不合理。" };
        data.meta.weeks_total = n;
        changed.push("总周数");
    }
    if (params.theme && String(params.theme).trim()) {
        var th = String(params.theme).trim().toLowerCase();
        if (th === "dark") th = "ink";
        if (th === "light") th = "strawberry";
        if (th !== "ink" && th !== "strawberry" && th !== "mint") {
            return { success: false, message: "❌ 皮肤只能是 ink（午夜金）/ strawberry（草莓牛奶）/ mint（雾薄荷）。" };
        }
        data.settings.theme = th;
        changed.push("皮肤 " + th);
    }
    if (params.show_room != null) { data.settings.show_room = !!params.show_room; changed.push("显示教室"); }
    if (params.show_teacher != null) { data.settings.show_teacher = !!params.show_teacher; changed.push("显示老师"); }
    if (changed.length) await saveData(data);
    var wk = weekOf(fmtDate(todayDate()), data);
    return {
        success: true,
        message: (changed.length ? "⚙️ 已更新：" + changed.join("、") + "\n" : "⚙️ 当前设置\n")
            + "· 第 1 周周一：" + data.meta.week1_monday + "（今天第 " + wk + " 周）\n"
            + "· 总周数：" + data.meta.weeks_total + "\n"
            + "· 皮肤：" + (data.settings.theme || "dark") + "\n"
            + "· 显示教室 / 老师：" + (data.settings.show_room !== false ? "是" : "否")
            + " / " + (data.settings.show_teacher !== false ? "是" : "否") + "\n"
            + "· 假期：" + (function () {
                var hs = holidays(data);
                if (!hs.length) return "还没设";
                var tot = 0, names = [];
                for (var q = 0; q < hs.length; q++) {
                    tot += holidayDays(hs[q]);
                    names.push(hs[q].name + " " + hs[q].from + "~" + hs[q].to);
                }
                return hs.length + " 段 / " + tot + " 天（" + names.join("；") + "）";
            })()
            + "\n· 补课日：" + (function () {
                var ms = makeups(data);
                if (!ms.length) return "还没设";
                var parts = [];
                for (var q = 0; q < ms.length; q++) parts.push(ms[q].date + " " + makeupDesc(ms[q]));
                return ms.length + " 天（" + parts.join("；") + "）";
            })(),
        meta: data.meta, settings: data.settings, today_week: wk, dataFile: DATA_PATH
    };
}

async function holiday(params) {
    params = params || {};
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    data.meta = data.meta || {};
    var list = holidays(data);
    var changed = "";
    var dirty = false;

    if (params.remove && String(params.remove).trim()) {
        var rm = String(params.remove).trim();
        var kept = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].name === rm || list[i].from === rm || list[i].to === rm) {
                changed = "🗑 删掉：" + list[i].name + "（" + list[i].from + " ~ " + list[i].to + "）";
                dirty = true;
                continue;
            }
            kept.push(list[i]);
        }
        if (!changed) return { success: false, message: "❌ 没找到这个假期（按名字或起始日期匹配都不中）。" };
        list = kept;
    } else if (params.from || params.to) {
        var a = parseDate(params.from || params.to);
        var b = parseDate(params.to || params.from);
        if (!a || !b) return { success: false, message: "❌ 日期要写 YYYY-MM-DD（from / to）。" };
        if (a.getTime() > b.getTime()) { var t = a; a = b; b = t; }
        var nm = params.name ? String(params.name).trim() : "放假";
        var dup = false;
        for (var k = 0; k < list.length; k++) {
            if (list[k].name === nm && list[k].from === fmtDate(a) && list[k].to === fmtDate(b)) dup = true;
        }
        if (!dup) {
            list.push({ name: nm, from: fmtDate(a), to: fmtDate(b) });
            list.sort(function (x, y) { return parseDate(x.from).getTime() - parseDate(y.from).getTime(); });
            changed = "➕ 加上：" + nm + " " + fmtDate(a) + " ~ " + fmtDate(b);
            dirty = true;
        } else {
            changed = "（这条已经有了，没重复加）";
        }
    }

    if (dirty) {
        data.meta.holidays = list;
        await saveData(data);
    }

    var lines = [], tot = 0;
    for (var m = 0; m < list.length; m++) {
        var dcount = holidayDays(list[m]);
        tot += dcount;
        lines.push("· " + list[m].name + "：" + list[m].from + " ~ " + list[m].to + "（" + dcount + " 天）");
    }
    var nowH = holidayOf(fmtDate(todayDate()), data);
    return {
        success: true,
        message: (changed ? changed + "\n" : "") + "🗓 假期表\n"
            + (lines.length ? lines.join("\n") : "（还没有假期，用 name + from + to 加一条）")
            + "\n共 " + list.length + " 段、" + tot + " 天"
            + (nowH ? "\n🎈 今天在假期里（第 " + nowH.day_index + " 天，还剩 " + nowH.days_left + " 天）" : ""),
        holidays: list, today_holiday: nowH
    };
}

async function makeup(params) {
    params = params || {};
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    data.meta = data.meta || {};
    var list = makeups(data);
    var changed = "", dirty = false;
    if (params.remove && String(params.remove).trim()) {
        var rm = resolveDate(params.remove) || String(params.remove).trim();
        var kept = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].date === rm) { changed = "🗑 删掉补课日：" + rm; dirty = true; continue; }
            kept.push(list[i]);
        }
        if (!dirty) return { success: false, message: "❌ 没找到这个补课日（" + rm + "）。" };
        list = kept;
    } else if (params.date || params.as) {
        var ds = resolveDate(params.date);
        if (!ds) return { success: false, message: "❌ 补课日期要写 YYYY-MM-DD（date）。" };
        var ad = parseAsDay(params.as);
        if (!ad) return { success: false, message: "❌ as 要写星期几，例如 4 或「周四」。" };
        var pt = parsePart(params.part);
        var item = { date: ds, as_day: ad };
        if (pt !== "all") item.part = pt;
        var desc = makeupDesc(item);
        var idx = -1;
        for (var k = 0; k < list.length; k++) if (list[k].date === ds) idx = k;
        if (idx >= 0) { changed = "✏️ 改：" + ds + "（原本 " + makeupDesc(list[idx]) + "）→ " + desc; list[idx] = item; }
        else { changed = "➕ 加上：" + ds + "（" + dayName(weekdayOf(ds)) + "）" + desc; list.push(item); }
        list.sort(function (x, y) { return x.date < y.date ? -1 : (x.date > y.date ? 1 : 0); });
        dirty = true;
    }
    if (dirty) { data.meta.makeups = list; await saveData(data); }
    var lines = [];
    for (var m = 0; m < list.length; m++) {
        var d0 = list[m];
        var info = blocksOn(d0.date, data);
        var names = [];
        for (var q = 0; q < info.blocks.length; q++) names.push(info.blocks[q].name + " " + info.blocks[q].start);
        lines.push("· " + d0.date + "（" + dayName(weekdayOf(d0.date)) + "）" + makeupDesc(d0) + "　共 " + info.blocks.length + " 门"
            + (names.length ? "：" + names.join("、") : ""));
    }
    return {
        success: true,
        message: (changed ? changed + "\n" : "") + "🗓 补课日\n"
            + (lines.length ? lines.join("\n") : "（还没有补课日，用 date + as 加一条；只想补晚上再加 part=晚上）")
            + "\n共 " + list.length + " 天",
        makeups: list
    };
}
async function selftest() {
    var results = [];
    function check(name, cond, detail) {
        results.push({ name: name, pass: !!cond, detail: detail === undefined ? "" : String(detail) });
    }
    var data = await loadData();
    if (!data) return { success: false, message: NO_DATA_MSG };
    try {
        var p1 = parseWeeks("4-18", 18);
        check("4-18 → 15 周（4 起 18 止）", p1.length === 15 && p1[0] === 4 && p1[14] === 18, p1.length);
        var p2 = parseWeeks("8", 18);
        check("「8」→ 只有第 8 周", p2.length === 1 && p2[0] === 8, p2.join(","));
        var p3 = parseWeeks("6-9", 18);
        check("6-9 → 6,7,8,9", p3.join(",") === "6,7,8,9", p3.join(","));
        var p4 = parseWeeks("1-6单", 18);
        check("1-6单 → 单周 1,3,5", p4.join(",") === "1,3,5", p4.join(","));
        var p5 = parseWeeks("1-6双", 18);
        check("1-6双 → 双周 2,4,6", p5.join(",") === "2,4,6", p5.join(","));

        check("2026-08-24 是第 1 周", weekOf("2026-08-24", data) === 1, weekOf("2026-08-24", data));
        check("2026-10-05 是第 7 周", weekOf("2026-10-05", data) === 7, weekOf("2026-10-05", data));
        check("2026-12-27 是第 18 周", weekOf("2026-12-27", data) === 18, weekOf("2026-12-27", data));
        check("2026-10-05 是周一", weekdayOf("2026-10-05") === 1, weekdayOf("2026-10-05"));

        var m1 = blocksOn("2026-10-05", data, { ignoreHoliday: true });
        check("10-05（周一·第7周）2 门、4 节",
            m1.blocks.length === 2 && m1.blocks[0].slots.join(",") === "1,2" && m1.blocks[1].slots.join(",") === "3,4",
            m1.blocks.length + " 门 / " + m1.blocks[0].start + "–" + m1.blocks[1].end);
        check("10-05 第一块时间 08:15–09:45", m1.blocks[0].start === "08:15" && m1.blocks[0].end === "09:45",
            m1.blocks[0].start + "–" + m1.blocks[0].end);
        check("10-05 第三节课时间按学校表 10:05",
            m1.blocks[1].start === "10:05" && m1.blocks[1].end === "11:35", m1.blocks[1].start + "–" + m1.blocks[1].end);

        var w5 = blocksOn("2026-09-23", data); // 第 5 周周三
        check("第 5 周周三没有国家安全教育（它 6-9 周）", w5.blocks.length === 2, w5.blocks.map(function (b) { return b.name; }).join("/"));

        var w7 = blocksOn("2026-10-07", data, { ignoreHoliday: true }); // 第 7 周周三
        check("第 7 周周三 3 门（含国家安全教育）", w7.blocks.length === 3, w7.blocks.map(function (b) { return b.name; }).join("/"));
        var w8 = blocksOn("2026-10-14", data); // 第 8 周周三
        var hasPolicy8 = false;
        for (var i = 0; i < w8.blocks.length; i++) if (w8.blocks[i].name.indexOf("形势与政策") >= 0) hasPolicy8 = true;
        check("第 8 周周三有形势与政策（4 节）", w8.blocks.length === 4 && hasPolicy8, w8.blocks.length + " 门");
        var w9 = blocksOn("2026-10-21", data); // 第 9 周周三
        var hasPolicy9 = false, hasSafety9 = false;
        for (var j = 0; j < w9.blocks.length; j++) {
            if (w9.blocks[j].name.indexOf("形势与政策") >= 0) hasPolicy9 = true;
            if (w9.blocks[j].name.indexOf("国家安全教育") >= 0) hasSafety9 = true;
        }
        check("第 9 周周三：国家安全教育在、形势与政策没了", hasSafety9 && !hasPolicy9, w9.blocks.length + " 门");

        var tue = blocksOn("2026-10-06", data, { ignoreHoliday: true }); // 第 7 周周二
        check("周二：中国古代文学被午休切开（第3-4节 + 第5节）",
            tue.blocks.length === 4 && tue.blocks[1].slots.join(",") === "3,4" && tue.blocks[2].slots.join(",") === "5",
            tue.blocks.length + " 块");
        check("周二晚上思想道德与法治是一整块（第9-11节）",
            tue.blocks[3] && tue.blocks[3].slots.join(",") === "9,10,11", tue.blocks[3] ? tue.blocks[3].slots.join(",") : "缺");

        var noMk = JSON.parse(JSON.stringify(data));
        noMk.meta = noMk.meta || {};
        noMk.meta.makeups = [];
        var f1 = blocksOn("2026-10-09", noMk); // 周五第 7 周（不看调课）
        check("周五只有 1 节（大学生职业生涯规划）", f1.blocks.length === 1 && f1.blocks[0].slots.join(",") === "3",
            f1.blocks.length + " 门");
        var sat = blocksOn("2026-10-10", noMk);
        check("周六（没调课时）没课", sat.blocks.length === 0, sat.blocks.length);

        var pre = blocksOn("2026-09-09", data); // 第 3 周，课还没开始
        check("第 3 周不上课（课都从 4 周起）", pre.blocks.length === 0, pre.blocks.length);
        // —— 假期（停课日）逻辑 ——
        var hA = blocksOn("2026-09-25", data); // 假期第一天
        check("假期第一天 09-25 不排课", hA.blocks.length === 0 && !!hA.holiday, hA.holiday ? hA.holiday.name : "没认成假期");
        var hB = blocksOn("2026-10-05", data); // 假期中（原本周一有课）
        check("假期中 10-05 不排课（本来周一有课）", hB.blocks.length === 0 && !!hB.holiday, hB.blocks.length + " 门");
        var hC = blocksOn("2026-10-07", data); // 假期最后一天
        check("假期最后一天 10-07 不排课", hC.blocks.length === 0 && !!hC.holiday, hC.blocks.length + " 门");
        var hD = blocksOn("2026-10-08", data); // 假期后第一天
        check("假期结束后 10-08 恢复上课（3 门）", hD.blocks.length === 3 && !hD.holiday, hD.blocks.length + " 门");
        var hE = blocksOn("2026-09-24", data); // 假期前一天
        check("假期前一天 09-24 照常上课", hE.blocks.length > 0 && !hE.holiday, hE.blocks.length + " 门");
        check("假期共 13 天（09-25 ~ 10-07）", holidayDays({ from: "2026-09-25", to: "2026-10-07" }) === 13, holidayDays({ from: "2026-09-25", to: "2026-10-07" }));

        // —— 补课日（调课）逻辑 ——
        check("补课解析：「4」→ 周四", parseAsDay("4") === 4, parseAsDay("4"));
        check("补课解析：「周四」→ 4", parseAsDay("周四") === 4, parseAsDay("周四"));
        check("补课解析：「星期4」→ 4", parseAsDay("星期4") === 4, parseAsDay("星期4"));
        check("补课解析：「礼拜天」→ 7", parseAsDay("礼拜天") === 7, parseAsDay("礼拜天"));
        var mkData = JSON.parse(JSON.stringify(data));
        mkData.meta = mkData.meta || {};
        mkData.meta.makeups = [{ date: "2026-10-10", as_day: 4 }];
        var mkSat = blocksOn("2026-10-10", mkData);
        check("10-10（周六）设成补周四 → 排 3 门",
            mkSat.blocks.length === 3 && !!mkSat.makeup && mkSat.makeup.as_day === 4,
            mkSat.blocks.length + " 门 / " + mkSat.blocks.map(function (b) { return b.name; }).join("、"));
        check("补课日和真周四课一样多（10-10 vs 10-08）",
            mkSat.blocks.length === blocksOn("2026-10-08", data).blocks.length,
            mkSat.blocks.length + " vs " + blocksOn("2026-10-08", data).blocks.length);
        var mkHol = JSON.parse(JSON.stringify(mkData));
        mkHol.meta.holidays = [{ name: "测试假", from: "2026-10-10", to: "2026-10-11" }];
        var mkH = blocksOn("2026-10-10", mkHol);
        check("补课日也受假期压制（落假期里就不排课）", mkH.blocks.length === 0 && !!mkH.holiday, mkH.blocks.length + " 门");
        check("把调课清空后 10-10 就没课了（调课逻辑真的在生效）", blocksOn("2026-10-10", noMk).blocks.length === 0, blocksOn("2026-10-10", noMk).blocks.length);

        // —— 只补半天（10-09 白天周五 + 晚上周四） ——
        check("part 解析：晚上 → evening", parsePart("晚上") === "evening", parsePart("晚上"));
        check("part 解析：空 → 全天", parsePart("") === "all", parsePart(""));
        var mkE = JSON.parse(JSON.stringify(data));
        mkE.meta = mkE.meta || {};
        mkE.meta.makeups = [{ date: "2026-10-09", as_day: 4, part: "evening" }];
        var e09 = blocksOn("2026-10-09", mkE);
        var e09names = e09.blocks.map(function (b) { return b.name; });
        check("10-09 白天周五 + 晚上周四：3 门", e09.blocks.length === 3, e09.blocks.length + " 门 / " + e09names.join("、"));
        check("10-09 没有周四白天的文学概论", e09names.join("").indexOf("文学概论") < 0, e09names.join("、"));
        check("10-09 有周四晚上的军事训练", e09names.join("").indexOf("军事训练") >= 0, e09names.join("、"));
        check("10-09 第一节 10:05、最后一节到 21:10",
            e09.blocks[0].start === "10:05" && e09.blocks[e09.blocks.length - 1].end === "21:10",
            e09.blocks[0].start + " / " + e09.blocks[e09.blocks.length - 1].end);
        var mkD = JSON.parse(JSON.stringify(data));
        mkD.meta = mkD.meta || {};
        mkD.meta.makeups = [{ date: "2026-10-10", as_day: 3 }];
        var d10 = blocksOn("2026-10-10", mkD);
        var d10names = d10.blocks.map(function (b) { return b.name; });
        check("10-10 全天补周三：3 门", d10.blocks.length === 3, d10.blocks.length + " 门 / " + d10names.join("、"));
        check("10-10 是周三课（有书写技能、没形势与政策）",
            d10names.join("").indexOf("书写技能") >= 0 && d10names.join("").indexOf("形势与政策") < 0, d10names.join("、"));
        check("makeupLabel：补周四晚 / 补周三",
            makeupLabel({ date: "2026-10-09", as_day: 4, part: "evening" }) === "补 周四 晚" && makeupLabel({ date: "2026-10-10", as_day: 3 }) === "补 周三",
            makeupLabel({ date: "2026-10-09", as_day: 4, part: "evening" }) + " | " + makeupLabel({ date: "2026-10-10", as_day: 3 }));
    } catch (e) {
        check("执行异常", false, e && e.message ? e.message : e);
    }
    var passCount = 0, lines = [];
    for (var k = 0; k < results.length; k++) {
        if (results[k].pass) passCount++;
        lines.push((results[k].pass ? "✅ " : "❌ ") + results[k].name + (results[k].detail ? "　→ " + results[k].detail : ""));
    }
    return {
        success: passCount === results.length,
        message: "🧪 课表自检 " + passCount + "/" + results.length + " 通过\n" + lines.join("\n"),
        passed: passCount, total: results.length, results: results
    };
}

exports.today = today;
exports.week = week;
exports.next = next;
exports.courses = courses;
exports.config = config;
exports.holiday = holiday;
exports.makeup = makeup;
exports.selftest = selftest;