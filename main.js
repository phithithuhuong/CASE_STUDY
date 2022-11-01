let work = [];//mảng rông chứa cv
let targets = [];//mảng rỗng chứa mục tiêu
work = JSON.parse(localStorage.getItem("work"))//vẫn hiển thị nội dung nhập khi thoát ra
targets = JSON.parse(localStorage.getItem("targets"))

class MyWork {//tạo lớp mô hình của công việc
    _day;
    _time;//thuộc tính
    _work;

    constructor(day, time, work) {//phương thức
        this._day = day;
        this._time = time;
        this._work = work;
    }


    get day() {
        return this._day;
    }

    set day(value) {
        this._day = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get work() {
        return this._work;
    }

    set work(value) {
        this._work = value;
    }
}

class myTarget {
    constructor(days, target) {
        this._target = target;
        this._days = days;
    }

    get target() {
        return this._target;
    }

    set target(value) {
        this._target = value;
    }

    get days() {
        return this._days;
    }

    set days(value) {
        this._days = value;
    }
}

function addTarget() {//hàm xli
    let day = document.getElementById('day').value;//lấy giá trị của ô ngày
    let target = document.getElementById('target').value;//lấy giá trị của ô mục tiêu
    let t = new myTarget(day, target);//đưa ngày và mục tiêu sang 1 hàm
    targets.push(t);//cho mô hình của mục tiêu thêm ngày và mục tiêu
    console.log(targets);
    localStorage.setItem('targets', JSON.stringify(targets))
    showTarget()

}

function showTarget() {
    let s = "<table>"//lập bảng đưa giá trị vào
    s = s + "<tr>"
    s = s + "<td style=\"color: red\"> Date</td>"
    s = s + "<td style=\"color: red\"> Target </td>"
    s = s + "</tr>"
    for (let i = 0; i < targets.length; i++) {//duyệt từng giá trị của ô ngày và mục tiêu
        s = s + "<tr>";
        s = s + "<td>" + targets[i]._days + "</td>";
        s = s + "<td>" + targets[i]._target + "</td>";//in ra
        s += "<td><button onclick='myEdit(" + i + ")'>Edit</button></td>"
        s += " <td><button onclick='myXoa(" + i + ")'>Delete</button></td>"
        s = s + '</tr>'

    }
    s += '</table>'
    document.getElementById("targettable").innerHTML = s;//hiển thị ra


}

function myEdit(index) {//sửa target

    let day = targets[index]._days
    let target = targets[index]._target
    let str = ''
    str = `
    <table align="right"><tr>
    <td>Date</td>
    <td><input type="date" id="date" value="${day}"></td>
</tr>
<tr>
<td>Target</td>
<td><input type="text" id="targetr" value="${target}"></td>
</tr>
<tr><td><button onclick="editTarget(` + index + `)">Save</button></td></tr></table>`

    document.getElementById('contentEdit').innerHTML = str;
}

function editTarget(index) {//hàm lưu
    targets = JSON.parse(localStorage.getItem('targets'))//
    targets[index]._days = document.getElementById('date').value;
    targets[index]._target = document.getElementById('targetr').value;
    let result = new myTarget(document.getElementById('date').value, document.getElementById('targetr').value)
    targets[index] = result;
    document.getElementById('contentEdit').innerHTML = '';//ấn vào save sẽ biến mất
    localStorage.setItem('targets', JSON.stringify(targets))
    showTarget()
}

function myXoa(index) {
    targets.splice(index, 1)

    localStorage.setItem('targets', JSON.stringify(targets))

    showTarget()


}

function disPlay() {//hàm xử lí của công việc

    let c = '<table>';//tạo bảng cv
    c += '<tr>'
    c += '<td style="color: red">Date</td>'
    c += '<td style="color: red">Time</td>'
    c += '<td style="color: red">Work </td>'
    c += '<td colspan="3" style="text-align: center ;color: red"">Adjust</td>'
    c += '</tr>'
    for (let i = 0; i < work.length; i++) {//duyệt
        c += '<tr>';
        c += '<td>' + work[i]._day + '</td>'
        c += '<td>' + work[i]._time + '</td>'
        c += '<td>' + work[i]._work + '</td>'
        c += '<td><button onclick="myDisplay(' + i + ')">Edit</button></td>'
        c += '<td><button  onclick="myDelete(' + i + ')">Delete</button></td>'
        c += '</tr>'
    }
    c += '</table>'
    document.getElementById('worktable').innerHTML = c

    showTarget()
}

function addWork() {
    let d = document.getElementById('daywork').value;
    let tim = document.getElementById('time').value;
    let cv = document.getElementById('cv').value;
    let myWork = new MyWork(d, tim, cv);
    work.push(myWork);
    disPlay()
    localStorage.setItem('work', JSON.stringify(work));
    document.getElementById('daywork').value = "";
    document.getElementById('time').value = "";
    document.getElementById('cv').value = "";

}

function myDisplay(index) {//sửa work

    let day = work[index]._day
    let time = work[index]._time
    let cv = work[index]._work
    let str = ''
    str = `<table><tr>
<td>Date</td>
<td><input type="date" id="editDate" value="${day}"></td>
</tr>
<tr>
<td>Time</td>
<td><input type="time" id="editTime" value="${time}"></td>
</tr> 
<tr>
<td>Work</td>
<td><input type="text" id="editWork" value="${cv}"></td>
</tr>
<tr>
<td><button onclick="saveContent(` + index + `)">Save</button></td>
</tr>
</table>`
    document.getElementById('showEdit').innerHTML = str;

}


function saveContent(index) {//hàm lưu

    work = JSON.parse(localStorage.getItem("work"));//
    work[index].day = document.getElementById('editDate').value;
    work[index].time = document.getElementById('editTime').value;
    work[index]._work = document.getElementById('editWork').value;
    let w = new MyWork(document.getElementById('editDate').value, document.getElementById('editTime').value, document.getElementById('editWork').value);
    work[index] = w;
    document.getElementById('showEdit').innerHTML = '';

    localStorage.setItem('work', JSON.stringify(work))

    disPlay();
}


function myDelete(inDex) {//xử lí xóa
    work.splice(inDex, 1);
    localStorage.setItem('work', JSON.stringify(work))
    disPlay();

}

