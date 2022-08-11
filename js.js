const font_target = document.getElementById("dropzone");
const css_edit = document.getElementById("css_edit");
const css_edit_font = document.getElementById("css_edit_font");
const css_ts = document.getElementById("css_textShadow");
const target_str = document.querySelector('#target > textarea');
const target_css = document.querySelector('#css--textarea--code');
const defaultStr = "CSS字幕ツール";
const defaultCss = "width: 500px;\nfont-size: 60px;\ncolor: #DC143C;\ntext-align: center;\nbackground: white;";

let backup_str = ["", defaultStr, defaultStr, defaultStr, defaultStr, defaultStr, defaultStr, defaultStr, defaultStr, defaultStr, defaultStr, defaultStr, defaultStr];
let backup_css = ["", defaultCss, defaultCss, defaultCss, defaultCss, defaultCss, defaultCss, defaultCss, defaultCss, defaultCss, defaultCss, defaultCss, defaultCss];
let backup_label = ["", "書式1", "書式2", "書式3", "書式4", "書式5", "書式6", "書式7", "書式8", "書式9", "書式10", "書式11", "書式12"];
let now_number = 1;
let storage_str = "";
let storage_css = "";
let storage_label = "";

let cssLog = "";

window.onload = function() {
    /* 復元 */
    backup_str = localStorage.getItem('str').split("|||");
    backup_css = localStorage.getItem('css').split("|||");
    backup_label = localStorage.getItem('label').split("|||");
    for (let i = 1; i < 13; i++) { document.querySelector("#css>ul>li:nth-child(" + i + ")>label").innerHTML = backup_label[i]; }
    target_str.value = backup_str[1];
    target_css.value = backup_css[1];

    update();
}

window.onresize = function() {
    update();
};

function update() {
    //cssよみこみ
    let css_text = target_css.value;
    //css代入
    css_edit.innerHTML = "#target > textarea" + "{\n" + css_text + "\n}\n";
    //canvasの高さをフォントサイズに合わせる
    target_str.style.height = parseFloat(getComputedStyle(target_str, null).getPropertyValue("font-size").slice(0, -2)) + 20 + "px";
    target_str.style.lineHeight = parseFloat(getComputedStyle(target_str, null).getPropertyValue("font-size").slice(0, -2)) + 20 + "px";
    for (let i = 1; i < 13; i++) { backup_label[i] = document.querySelector('#css>ul>li:nth-child(' + i + ')>label').innerHTML; }
    //textShadowのDummyを全消しする
    const old_dummy = document.querySelectorAll('[id^="textShadowDummy_"]');
    old_dummy.forEach((e) => { e.parentNode.removeChild(e); });
    //textShadowの値の数だけDummyを生成
    const tsArray = textShadowArray(target_str);
    if (tsArray[0] !== "none") {
        let tsNodeArray = [];
        for (let i = 0; i < tsArray.length; i++) {
            tsNodeArray[i] = document.createElement('div');
            tsNodeArray[i].style.textShadow = (tsArray[i]);
            tsNodeArray[i].id = "textShadowDummy_" + i;
            tsNodeArray[i].innerHTML = target_str.value;
            target_str.parentNode.appendChild(tsNodeArray[i]);
        }
        css_ts.innerHTML = '[id^="textShadowDummy_"]{' + css_text + '}' + '[id^="textShadowDummy_"]{border:0;display:none;left:' + target_str.getBoundingClientRect().left + 'px;top:calc(' + target_str.getBoundingClientRect().top + 'px + 10px);}';
    }
    //バックアップに今の値を代入してストレージにバックアップを保存
    backup_str[now_number] = target_str.value;
    backup_css[now_number] = css_text;
    storage();
}

function reset() {
    target_css.value = defaultCss;
    target_str.value = defaultStr;
    document.querySelector('#css>ul>li:nth-child(' + now_number + ')>label').innerHTML = "書式" + now_number;
    update();
}

function str_change(new_number) {
    backup_str[now_number] = target_str.value;
    backup_css[now_number] = target_css.value;
    document.querySelector('#css>ul>li:nth-child(' + now_number + ')>label').className = "str_not_now";
    document.querySelector('#css>ul>li:nth-child(' + new_number + ')>label').className = "str_now";
    target_str.value = backup_str[new_number];
    target_css.value = backup_css[new_number];
    now_number = new_number;
    update();
}


function storage() {
    storage_str = backup_str.join("|||");
    storage_css = backup_css.join("|||");
    storage_label = backup_label.join("|||");
    localStorage.setItem('str', storage_str);
    localStorage.setItem('css', storage_css);
    localStorage.setItem('label', storage_label);
}

function save() {
    /*textShadowDummyを復元*/
    cssLog = css_ts.innerHTML;
    css_ts.innerHTML = css_ts.innerHTML.split("display:none;").join('');
    /*html2canvas*/
    html2canvas(target_str.parentNode, {
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL();
            document.getElementById("result").src = imgData;
        }
    });
}

function save_finish() {
    /*textShadowDummyを再び消しとく*/
    css_ts.innerHTML = cssLog;
}

let DandDreset = function(event) { event.preventDefault(); };
let fontChange = function(event) {
    event.preventDefault();

    const dataTransfer = event.dataTransfer;
    const font_name = dataTransfer.files[0].name;

    css_edit_font.innerHTML = '@font-face { font-family: "myFont"; src: url("' + font_name + '"); }';
    document.querySelector("#target > textarea").style.fontFamily = "\"myFont\", sans-serif;";
    document.getElementById("setting_flag").checked = false;
};
font_target.ondragover = DandDreset;
font_target.ondrop = fontChange;

function textShadowArray(target) {
    const style = window.getComputedStyle(target);
    const value = style.textShadow;
    let value2 = value;
    // RGB -> #xxxxxx
    for (let i = 0; i < counter(value, "rgb("); i++) {
        const start = value2.indexOf('rgb(');
        const end = value2.indexOf(')') + 1;
        const RGB = value2.substring(start, end);
        value2 = value2.replace(value2.substring(start, end), rgbTo16(RGB));
    }
    const valueArray = value2.split(',');
    return valueArray;
}

function counter(str, seq) { return str.split(seq).length - 1; }

function rgbTo16(col) { return "#" + col.match(/\d+/g).map(function(a) { return ("0" + parseInt(a).toString(16)).slice(-2) }).join(""); }