var result = document.getElementsByClassName("result");
var btnSubmit = document.getElementsByClassName("btn-success");
// Báo lỗi dữ liệu trống
function validValue(x) {
  var inputValue = document.getElementsByClassName("form-group")[x].getElementsByTagName("input");
  for (var i = 0; i < inputValue.length; i++) {
    if (inputValue[i].value == "") {
      return false;
    }  }
  return true;
}

//TÍNH ĐIỂM ƯU TIÊN
function areaPoint(contestantArea) {
  switch (contestantArea) {
    case "areaA":
      return 2;
    case "areaB":
      return 1;
    case "areaC":
      return 0.5;
    case "areanull":
      return 0;
  }
}
function objectPoint(contestantObject) {
  switch (contestantObject) {
    case "object1":
      return 2.5;
    case "object2":
      return 1.5;
    case "object3":
      return 1;
    case "objectnull":
      return 0;
  }
}

//TÍNH TỔNG ĐIỂM
function calcTotalPoint(point, areaPnt, objectPnt){
  var totalPnt=0;
  for(var i=0;i<point.length;i++){
    totalPnt+=parseFloat(point[i].value);
  }
  totalPnt+=areaPnt+ objectPnt;
  return totalPnt;
}

//KIỂM TRA KẾT QUẢ ĐẬU RỚT
function calcResult(totalPoint,standardPoint,point){
  // KHÔNG CÓ MÔN NÀO KHÔNG ĐIỂM
  for (var i=0;i<point.length;i++){
    if(parseFloat(point[i].value)===0){
      return false;
    }
  }
  // TỔNG ĐIỂM THẤP HƠN ĐIỂM CHUẨN
  if (totalPoint<standardPoint){
    return false;
  }
  return true;
}

//THÔNG BÁO 
function inform(validValue,calcResult, totalPnt){
  result[0].innerHTML="";
  result[0].classList.remove("text-danger");
  if (!validValue){
    result[0].classList.add("text-danger");
    result[0].innerHTML="Hãy nhập đủ dữ liệu được yêu cầu."
    return;
  }
  result[0].innerHTML+="Tổng điểm của bạn là " + totalPnt + "<br>";
  if(calcResult){
    result[0].innerHTML+="Kết quả đạt";
    return;
  }
  result[0].classList.add("text-danger");
  result[0].innerHTML+="Kết quả rớt";
}

function exercise1(){
  var standardPoint =parseFloat(document.getElementById("standardPoint").value);
  var contestantArea = document.getElementById("contestantArea").value;
  var contestantSubject = document.getElementById("contestantSubject").value;
  var pointInput =document.getElementById("studentPoint").getElementsByTagName("input");

  var totalPnt = calcTotalPoint(pointInput,areaPoint(contestantArea), objectPoint(contestantSubject));

  inform(validValue(0),calcResult(totalPnt,standardPoint,pointInput),totalPnt);
}

function calcElectricpaid(electricConsume){
  var paid = 0;
  if (electricConsume<=50){
    paid += electricConsume*500;
  }
  else if (electricConsume<=100){
    paid += 50*500+ (electricConsume-50)*650;
  }
  else if (electricConsume<=200){
    paid+=50*500+50*650+(electricConsume-100)*850;
  }
  else if(electricConsume<=350){
    paid+=50*500+50*650+100*850+(electricConsume-200)*1100;
  }
  else{
    paid+=50*500+50*650+100*850+150*1100+(electricConsume-350)*1300;
  }
  return paid;
}

function inform2(validValue,electricPaid,nameCustomer){
  result[1].classList.remove("text-danger");
  if (!validValue){
    result[1].classList.add("text-danger");
    result[1].innerHTML="Hãy nhập đủ dữ liệu được yêu cầu."
    return;
  }
  result[1].innerHTML=" Tổng tiền điện của "+ nameCustomer +" là " + electricPaid + " VND";
}


function exercise2(){
  var nameCustomer = document.getElementById("nameCustomer").value;
  var electricConsume = document.getElementById("electricConsume").value;
  
  inform2(validValue(1),calcElectricpaid(electricConsume),nameCustomer)
}


// BÀI 3

// TÍNH THU NHẬP CHỊU THUẾ
function calcTaxIncome(totalIncome,numDepend){
  return (totalIncome-4-1.6*numDepend)
}
function taxPaid(taxIncome){
  if(taxIncome<0){
    return false;
  }
  if(taxIncome<60){
    return Math.floor(5*taxIncome)/100;
  }
  if(taxIncome<120){
    return Math.floor(10*taxIncome)/100;
  }
  if(taxIncome<210){
    return Math.floor(15*taxIncome)/100;
  }
  if(taxIncome<384){
    return Math.floor(20*taxIncome)/100;
  }
  if(taxIncome<624){
    return Math.floor(25*taxIncome)/100;
  }
  if(taxIncome<960){
    return Math.floor(30*taxIncome)/100;
  }
  return Math.floor(35*taxIncome)/100;
}

function inform3(validValue,taxPaid,nameCsm){
  result[2].classList.remove("text-danger");
  if (!validValue){
    result[2].classList.add("text-danger");
    result[2].innerHTML="Hãy nhập đủ dữ liệu được yêu cầu."
    return;
  }
  if(!taxPaid){
    result[2].innerHTML=nameCsm +" không phải đóng thuế.";
    return;
  }
  result[2].innerHTML="Tổng tiền thuế "+ nameCsm +" phải đóng là " + taxPaid + " triệu VND";
}

function exercise3(){
  var nameCsm = document.getElementById("nameCsm").value;
  var totalIncome = parseFloat(document.getElementById("totalIncome").value);
  var numDepend = parseInt(document.getElementById("numDepend").value);
  taxPaid(calcTaxIncome(totalIncome,numDepend))
  inform3(validValue(2),taxPaid(calcTaxIncome(totalIncome,numDepend)),nameCsm)
}

// BÀI 4. TÍNH TIỀN CÁP 
var typeCsm=document.getElementById("typeCsm");
var idCsm=document.getElementById("idCsm");
var numConnect=document.getElementById("numConnect");
var numChannel=document.getElementById("numChannel");
// XỬ LÍ DỮ LIỆU LOẠI KHÁCH HÀNG
function idValidation(typeCsm,idCsm){
  result[3].classList.add("text-danger");
  var regex;
  if(typeCsm==="individualCsm"){
    regex = /^CN.{4,}$/;
    if(!idCsm.match(regex)){
      return "Mã khách hàng cá nhân chứa ít nhất 6 kí tự và ở dạng [CN****]";
    }}
  else if(typeCsm==="businessCsm"){
    regex = /^DN.{4,}$/;
    if(!idCsm.match(regex)){
      return "Mã khách hàng doanh nghiệp chứa ít nhất 6 kí tự ở dạng [DN****]";
    }
  }
  result[3].classList.remove("text-danger");
  return "";
}

idCsm.onchange=function(){
  result[3].innerHTML=idValidation(typeCsm.value,idCsm.value.toUpperCase())
}
typeCsm.onchange=function(){
  if(idCsm.value!==""){
    result[3].innerHTML=idValidation(typeCsm.value,idCsm.value.toUpperCase())
  }
  if(typeCsm.value==="businessCsm"){
    numConnect.value=null;
    numConnect.classList.remove("d-none");
  }
  else{
    numConnect.value=0;
    numConnect.classList.add("d-none");
  }

}

function calcCableFee(type,numChannel,numConnect){
  var fee = 0;
  if(type==="individualCsm"){
    fee+=4.5+20.5+7.5*numChannel;
  }
  else{
    fee+=15+75+50*numChannel;
    if(numConnect>10){
      fee+=5*(numConnect-10);
    }
  }
  return fee;
}

function exercise4(){
  result[3].classList.remove("text-danger");
  if (!validValue(3) || (typeCsm.value==="")){
    result[3].classList.add("text-danger");
    result[3].innerHTML="Hãy nhập đủ dữ liệu được yêu cầu."
    return;
  }
  result[3].innerHTML="Tiền cáp của khách hàng  "+ idCsm.value.toUpperCase() +" là " + calcCableFee(typeCsm.value,parseInt(numChannel.value),parseInt(numConnect.value)) + " $.";
}


btnSubmit[0].onclick = function(e){
  e.preventDefault;
  exercise1();
}

btnSubmit[1].onclick = function(e){
  e.preventDefault;
  exercise2();
}

btnSubmit[2].onclick = function(e){
  e.preventDefault;
  exercise3();
}

btnSubmit[3].onclick = function(e){
  e.preventDefault;
  exercise4();
}